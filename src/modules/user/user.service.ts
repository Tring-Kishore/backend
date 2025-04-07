import { Any, getRepository, IsNull } from "typeorm";
import { User, UserRole } from "./entity/user.entity";
import { UserDetails } from "./entity/userDetails.entity";
import { JobAppliedByUserInput, JobApplyInput, LoginInput, UpdateUserInput, UploadResumeInput, UserIdInput, UserInput, WithdrawApplicationInput } from "./input";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Service } from "typedi";
import dataSource from "../../database/data-source";
import { OrganizationService } from "../../modules/organization/organization.service";
import { Organization } from "../organization/entity/organization.entity";
import * as jwt from "jsonwebtoken";
import {  JobAppliedByUserResponse, JobApplyResponse, JobPostResponse, LoginResponse, UploadResumeResponse, UserDetailsResponse, WithdrawApplicationResponse } from "./response";
import { GetAllUser } from "modules/admin/response";
import { JobPost } from "../jobs/entity/jobPost.entity";
import { JobApplied } from "../jobs/entity/jobApplied.entity";
import { UploadPdfInput } from "modules/s3/s3.input";
import { UploadPdfResponse } from "modules/s3/s3.response";
@Service()
export class UserService {
   constructor(
    private userRepository = dataSource.getRepository(User),
  private userDetailsRepository = dataSource.getRepository(UserDetails),
  private orgRepository = dataSource.getRepository(Organization),
  private jobPostRepository = dataSource.getRepository(JobPost),
  private jobAppliedRepository = dataSource.getRepository(JobApplied)
  ) {}
  

  
  async signUpUser(input: UserInput): Promise<User> {
    try {
      console.log("Service received input:", input);
      const { name, email, phone, password } = input;
      const normalizedEmail = email.toLowerCase();

      const existingUser = await this.userRepository.findOne({
        where: { email: normalizedEmail },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();

      const savedUser = await this.userRepository.save( {id:id,
        name : name,
        email : normalizedEmail,
        phone : phone,
        password : hashedPassword,
        role : UserRole.USER});

      console.log('the saved user ',savedUser);
      
      const userdetails = await this.userDetailsRepository.save({
        id: uuidv4(),
        user: {id:id},
        age: 18,
        experience : "",
        skills: "",
        description:"",
      })
      console.log('the userdetails ',userdetails);
      
      console.log("User created successfully:", savedUser);
      return savedUser;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    try {
      const {email, password} = input;
      console.log('the service in the login',input);
      
      const normalizedEmail = email.toLowerCase();

      const user = await this.userRepository.findOne({where:{email:normalizedEmail,deleted_at:IsNull()},select:['id','name','email','password','role']});
  
      if (!user) {
        throw new Error('User Not found');
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      let updatePasswordState = false
      if (user.role === 'organization') {
         const [organization] = await this.orgRepository.query(
          `SELECT update_password_state FROM organizations WHERE organization_id = $1 AND deleted_at IS NULL`,
          [user.id]
        );
        
        if (organization) {
          updatePasswordState = organization.update_password_state;
        }
      }
  
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not configured');
      }
  
      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          role: user.role,
          update_password_state: updatePasswordState
        },
        process.env.JWT_SECRET,
        {expiresIn: '1hr'}
      );
      console.log('the token datas ',user.id, " ",user.name , " ",user.role, " ",updatePasswordState);
      
      console.log('the service of token ',token);
      
      return {token : token};
    } catch(error) {
      console.error('Login Error', error);
      throw error;
    }
  }
  async allJobPosts():Promise<JobPostResponse[]>
  {
    const posts : any  = await this.jobPostRepository.find({
      where: { deleted_at: IsNull() },
      relations: ['organization'],});
      console.log('the post are',posts);
      
      return posts.map((post:any) => ({
        id: post.id,
        job_title: post.job_title,
        category: post.category,
        openings: post.openings,
        experience: post.experience,
        description: post.description,
        package: post.package,
        language: post.language,
        skills: post.skills,
        organization_id: post.organization.id,
        organization_name: post.organization.name,
        status: post.status,
      }));
  }
  //applying for job
  async applyForJob(input: JobApplyInput): Promise<JobApplyResponse> {
    try {
        const [existingApplication] = await this.jobAppliedRepository.query(
            `SELECT * FROM jobapplied 
             WHERE jobpost_id = $1 AND user_id = $2 AND deleted_at IS NULL`,
            [input.jobpost_id, input.user_id]
        );

        if (existingApplication) {
            throw new Error('You have already applied for this job');
        }

     
        const [checking] = await this.userDetailsRepository.query(`
            SELECT age, experience, skills, description FROM userdetails WHERE user_id = $1
        `, [input.user_id]);

        
        if (!checking || checking.age === null || checking.experience === null || 
            !checking.skills || !checking.description) {
            throw new Error('Please complete your profile before applying for a job');
        }

        console.log('it is working untill us details ',checking);
        
        const id = uuidv4();
        
        const [result] = await this.jobAppliedRepository.query(
            `INSERT INTO jobapplied (
                id, jobpost_id, user_id, organization_id, status
            ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [id, input.jobpost_id, input.user_id, input.organization_id, 'applied']
        );
        console.log('the job applied ',result);
        
        return result;

    } catch (error: any) {
        if (error.message === 'You have already applied for this job' || 
            error.message === 'Please complete your profile before applying for a job') {
            throw error;
        }
        throw new Error('Failed to apply for job');
    }
}
  //getting user applie jobs
  async getUserJobApplied(context : any):Promise<JobAppliedByUserResponse[]>
  {
    const userId = context.id;
    const result = await this.jobAppliedRepository.query(
      `SELECT 
        ja.id, ja.jobpost_id, ja.organization_id, ja.user_id, ja.status,ja.created_at, ja.updated_at,
        u.name, u.email,
        jp.job_title, jp.category, jp.openings, jp.skills,
        org.name AS company
       FROM jobapplied ja
       JOIN users u ON ja.user_id = u.id
       JOIN jobposts jp ON ja.jobpost_id = jp.id
       JOIN users org ON ja.organization_id = org.id
       WHERE ja.user_id = $1 AND ja.deleted_at IS NULL`,
      [userId]
    );
    console.log('the user applied job',result);
    return result;
  }
  async countUserApplications(context : any):Promise<Number>
  {
    const userId = context.id;
    const result : any = await this.jobAppliedRepository.count({where:{
      user:{id:userId},deleted_at:IsNull()
    }});
    console.log('the result',result);
    return result;
  }
  async user(context : any):Promise<UserDetailsResponse>
  {
    const userId = context.id;
    const result = await this.userRepository.query(`
      SELECT u.id , u.name ,u.email , u.phone , ud.age , ud.experience , ud.skills , ud.description, ud.resume AS "resumeKey" FROM users u
INNER JOIN userdetails ud ON u.id = ud.user_id
WHERE u.id = $1
      `,[userId]);
      console.log('the user details ',result[0]);
      
    return result[0];
  }
  async updateUser(input:UpdateUserInput):Promise<UserDetailsResponse>
  {
    
    await this.userRepository.update({id:input.id},{name:input.name,email:input.email,phone:input.phone,updated_at:new Date()})

    await this.userDetailsRepository.update({user:{id:input.id}},{age:Number(input.age),experience:input.experience,skills:input.skills,description:input.description,updated_at:new Date()})

    const result : any = await this.userRepository.findOne({where:{id:input.id},relations:['details']});
    return {
      id: result?.id,
      name : result?.name,
      email:result?.email,
      phone:result?.phone,
      age: result?.details?.age,
      experience: result?.details?.experience,
      skills : result?.details?.skills,
      description:result?.details?.description,
    }
    

  }
  //withdraw application 
  async withdrawApplication(context : any):Promise<WithdrawApplicationResponse>
  {
    const userId = context.id;
    const result = await this.jobAppliedRepository.update({id:userId,deleted_at:IsNull()},{deleted_at:new Date()});
    return {
      id: userId
    };
  }
  async uploadResume(input:UploadResumeInput):Promise<UploadResumeResponse>
  {
    await this.userDetailsRepository.update({user:{id:input.id},deleted_at:IsNull()},{resume:input.resumeKey});
    console.log('the resume updated successfully',input.resumeKey);
    
    return {
      id:input.id,
      resumeKey:input.resumeKey
    }
  }
  
}
