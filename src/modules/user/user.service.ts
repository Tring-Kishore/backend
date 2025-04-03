import { getRepository } from "typeorm";
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
      const userId = uuidv4();

      const savedUser = await this.userRepository.save( {id:userId,
        name : name,
        email : normalizedEmail,
        phone : phone,
        password : hashedPassword,
        role : UserRole.USER});

      console.log('the saved user ',savedUser);
      
      await this.userDetailsRepository.save({
        id: uuidv4(),
        userId: savedUser.id,
        age: 18,
        experience : "",
        skills: "",
        description:"",
      })

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
      
      const [user] = await this.userRepository.query(
        `SELECT id, name, email, password, role FROM users WHERE email = $1 AND deleted_at IS NULL`, 
        [normalizedEmail]
      );
  
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
        {expiresIn: '1h'}
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
    const posts = await this.jobPostRepository.query(`
      SELECT j.id , j.job_title , j.category , j.openings , j.experience , j.description , j.package , j.language , j.skills ,j.organization_id, u.name AS organization_name 
           FROM jobposts j
           JOIN users u ON j.organization_id = u.id 
           WHERE j.deleted_at IS NULL
      `);
      console.log('the post are',posts);
      
      return posts;
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

        const id = uuidv4();
        const [result] = await this.jobAppliedRepository.query(
            `INSERT INTO jobapplied (
                id, jobpost_id, user_id, organization_id, status
            ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [id, input.jobpost_id, input.user_id, input.organization_id, 'applied']
        );

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
  async getUserJobApplied(input:JobAppliedByUserInput):Promise<JobAppliedByUserResponse[]>
  {
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
      [input.id]
    );
    return result;
  }
  async countUserApplications(input:UserIdInput):Promise<Number>
  {
    const result = await this.userRepository.query(
      `SELECT COUNT(id) FROM jobapplied WHERE user_id = $1 AND deleted_at IS NULL`,
      [input.id]
    );
    const count = parseInt(result[0].count);
    return count;
  }
  async user(input:UserIdInput):Promise<UserDetailsResponse>
  {
    const result = await this.userRepository.query(`
      SELECT u.id , u.name ,u.email , u.phone , ud.age , ud.experience , ud.skills , ud.description, ud.resume AS "resumeKey" FROM users u
INNER JOIN userdetails ud ON u.id = ud.user_id
WHERE u.id = $1
      `,[input.id]);
      console.log('the user details ',result[0]);
      
    return result[0];
  }
  async updateUser(input:UpdateUserInput):Promise<UserDetailsResponse>
  {
    await this.userRepository.query(
      `UPDATE users
       SET name = $1, email = $2, phone = $3, updated_at = NOW()
       WHERE id = $4`,
      [input.name, input.email, input.phone, input.id]
    );

    await this.userDetailsRepository.query(
      `UPDATE userdetails
       SET age = $1, experience = $2, skills = $3, description = $4, updated_at = NOW()
       WHERE user_id = $5`,
      [input.age, input.experience, input.skills, input.description, input.id]
    );

    const result = await this.userRepository.query(`
      SELECT u.id , u.name ,u.email , u.phone , ud.age , ud.experience , ud.skills , ud.description  FROM users u
INNER JOIN userdetails ud ON u.id = ud.user_id
WHERE u.id = $1
      `,[input.id]);
      console.log('the user details ',result[0]);
      
    return result[0];

  }
  //withdraw application 
  async withdrawApplication(input:WithdrawApplicationInput):Promise<WithdrawApplicationResponse>
  {
    await this.jobAppliedRepository.query(`
      UPDATE jobapplied SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL 
      `,[input.id])

    const withdraw = await this.jobAppliedRepository.query(`
      SELECT id FROM jobapplied WHERE id = $1
      `,[input.id]);

    return withdraw[0];
  }
  async uploadResume(input:UploadResumeInput):Promise<UploadResumeResponse>
  {
    await this.userDetailsRepository.query(
      `UPDATE userdetails SET resume = $1 WHERE user_id = $2 AND deleted_at IS NULL`,[input.resumeKey,input.id]
    )
    console.log('the resume updated successfully',input.resumeKey);
    
    return {
      id:input.id,
      resumeKey:input.resumeKey
    }
  }
  
}
