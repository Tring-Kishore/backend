import dataSource from "../../database/data-source";
import { Organization } from "../organization/entity/organization.entity";
import { Service } from "typedi";
import {
  AllApprovedOrganization,
  AllRequestedOrganization,
  DeleteOrganizationResponse,
  DeleteUserResponse,
  GetAllUser,
  UpdateJobPostStatusResponse,
  UpdateOrganizationPasswordResponse,
  UpdateOrganizationStatusResponse,
} from "./response";
import { User } from "../user/entity/user.entity";
import { DeleteOrganizationInput, UpdateJobPostStatusInput, UpdateOrganizationPasswordInput, UpdateOrganizationStatusInput } from "./input";
import * as bcrypt from "bcrypt";
import { JobPost } from "../jobs/entity/jobPost.entity";
import { UserDetails } from "../user/entity/userDetails.entity";
import { JobApplied } from "../jobs/entity/jobApplied.entity";
import { generatePassword } from '../../../utils/passwordGenerator';
import { sendEmail } from "../../../utils/emailSender";
import nodemailer from 'nodemailer';
import { IsNull } from "typeorm";
@Service()
export class AdminService {
  constructor(
    private orgRepository = dataSource.getRepository(Organization),
    private userRepository = dataSource.getRepository(User),
    private jobpostRepository = dataSource.getRepository(JobPost),
    private userDetailsRepository = dataSource.getRepository(UserDetails),
    private jobAppliedRepository = dataSource.getRepository(JobApplied),
  ) {}
  async getAllOrganizations(): Promise<AllApprovedOrganization[]> {
    // const organizations = await this.orgRepository.find({where:{user:{role:'organization'}},relations:['user']})
    const organizations = await this.orgRepository.query(`
            SELECT o.id, o.website, o.description, o.status, o.location, o.created_at, o.updated_at, o.deleted_at, o.organization_id, o.update_password_state,u.id AS "user_id", u.name AS "user_name", u.email AS "user_email", u.phone AS "user_phone",u.role AS "user_role"
            FROM users u
            INNER JOIN organizations o ON u.id = o.organization_id
            WHERE u.role = 'organization' AND u.deleted_at IS NULL
            
        `);

    return organizations.map(
      (org: {
        id: string;
        website: string;
        description: string;
        status: string;
        location: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
        organization_id: string;
        update_password_state: boolean;
        user_id: string;
        user_name: string;
        user_email: string;
        user_phone: string;
        user_role: string;
      }) => ({
        id: org.id,
        website: org.website,
        description: org.description,
        status: org.status,
        location: org.location,
        created_at: org.created_at,
        updated_at: org.updated_at,
        deleted_at: org.deleted_at,
        organization_id: org.organization_id,
        update_password_state: org.update_password_state,
        user: {
          id: org.user_id,
          name: org.user_name,
          email: org.user_email,
          phone: org.user_phone,
          role: org.user_role,
        },
      })
    );
  }
  
  async users(): Promise<GetAllUser[]> {
    const user = await this.userRepository.find({where:{role:'user'}});
    return user;
  }
  async deleteUser(id: string): Promise<DeleteUserResponse> {
    try {
      const user = await this.userRepository.findOne({where:{id:id},select:['id','name']});
  
      if (!user) {
        throw new Error('User not found or already deleted');
      }
      await this.userRepository.query('BEGIN');
  
      try {
        await this.userRepository.update({id:id},{deleted_at:new Date()});
        await this.userDetailsRepository.update({user:{id:id}},{deleted_at:new Date()});
       
        await this.jobAppliedRepository.update({user:{id:id}},{deleted_at:new Date()});
       
        await this.userRepository.query('COMMIT');
  
        return { id: user.id, name: user.name };
  
      } catch (error) {
        await this.userRepository.query('ROLLBACK');
        throw new Error('Failed to delete user');
      }
  
    } catch (error: any) {
      if (error.message === 'User not found or already deleted') {
        throw error;
      }
      throw new Error('Failed to delete user');
    }
  }
  async deleteOrganization(input:DeleteOrganizationInput): Promise<DeleteOrganizationResponse> {
    
    const [organization] = await this.orgRepository.query(
        `SELECT organization_id FROM organizations WHERE id = $1 AND deleted_at IS NULL`,[input.id]
    );
    await this.orgRepository.update({id:input.id},{deleted_at:new Date()});
    
    await this.userRepository.update({id:organization.organization_id},{deleted_at:new Date()});
    
    await this.jobpostRepository.query(
      `UPDATE jobposts SET deleted_at = NOW() WHERE organization_id = $1 AND deleted_at IS NULL`,[organization.organization_id]
    );
    await this.jobAppliedRepository.query(
      `UPDATE jobapplied SET deleted_at = NOW() WHERE organization_id = $1 AND deleted_at IS NULL`,[organization.organization_id]
    );

    return {id:input.id};
  }
  async updateOrganizationPassword(
    input: UpdateOrganizationPasswordInput
  ): Promise<UpdateOrganizationPasswordResponse> {
    
    const newpassword : any = await this.userRepository.findOne({where:{id:input.id},select:['password']});
  
    console.log('the old password is ',newpassword.password);
    const isOldPassword = await bcrypt.compare(input.oldPassword,newpassword.password);
    if(!isOldPassword)
    {
      throw new Error('Current password is incorrect');
    }
    const hashedPassword = await bcrypt.hash(input.newPassword, 10);
    
    await this.userRepository.update({id:input.id},{password:hashedPassword})
    

    await this.orgRepository.update({user:{id:input.id}},{update_password_state:true});
    

    console.log("the password is ", input.newPassword);

    return {
      update_password_state: true,
    };
  }
  async updateOrganizationStatus(input : UpdateOrganizationStatusInput):Promise<UpdateOrganizationStatusResponse>
  {
    
    const result : any = await this.orgRepository.findOne({where:{id:input.id},relations:['user']});
    
    await this.orgRepository.update({id:input.id},{status:input.status});
   
        if (input.status === 'approved' || input.status === 'rejected') {
          let emailSubject = `Application Status Updated: ${input.status}`;
          let emailText = '';
    
          if (input.status === 'approved') {
            const defaultPassword = generatePassword();
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
            await this.userRepository.update({id:result?.user?.id},{password:hashedPassword});
           
    
            emailText = `Your organization has been approved. 
            The default password is ${defaultPassword}. After logging in, you can change the password.`;
          } else if (input.status === 'rejected') {
            emailText = `Your application has been rejected.`;
          }
    
          await sendEmail({
            from: process.env.EMAIL,
            to: result?.user?.email,
            subject: emailSubject,
            text: emailText,
          });
        }
    return {id:input.id , status:input.status};
  }
  async countOrganizations():Promise<Number>
  {
    const result = await this.userRepository.count({where:{role:'organization'}});
   

    return result;
  }
  async countUsers():Promise<Number>
  {
    const result = await this.userRepository.count({where:{role:'user'}});
    
    return result;
  }
  async countJobPosts():Promise<Number>
  {
    const result = await this.jobpostRepository.count();
   
    return result;
  }
  async updateStatus(input: UpdateJobPostStatusInput,): Promise<UpdateJobPostStatusResponse> {
    await this.jobpostRepository.update(input.id, { status: input.status });
    
    const updatedPost = await this.jobpostRepository.findOne({
      where: { id: input.id },
    });
    return {
      id: input.id,
      status: input.status,
    };
  }
}
