import dataSource from "../../database/data-source";
import { Organization } from "../organization/entity/organization.entity";
import { Service } from "typedi";
import {
  AllApprovedOrganization,
  AllRequestedOrganization,
  DeleteOrganizationResponse,
  DeleteUserResponse,
  GetAllUser,
  UpdateOrganizationPasswordResponse,
  UpdateOrganizationStatusResponse,
} from "./response";
import { User } from "../user/entity/user.entity";
import { DeleteOrganizationInput, UpdateOrganizationPasswordInput, UpdateOrganizationStatusInput } from "./input";
import * as bcrypt from "bcrypt";
import { JobPost } from "../jobs/entity/jobPost.entity";
import { UserDetails } from "../user/entity/userDetails.entity";
import { JobApplied } from "../jobs/entity/jobApplied.entity";

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
    const organizations = await this.orgRepository.query(`
            SELECT o.id, o.website, o.description, o.status, o.location, o.created_at, o.updated_at, o.deleted_at, o.organization_id, o.update_password_state,u.id AS "user_id", u.name AS "user_name", u.email AS "user_email", u.phone AS "user_phone",u.role AS "user_role"
            FROM users u
            INNER JOIN organizations o ON u.id = o.organization_id
            WHERE u.role = 'organization' 
            AND u.deleted_at IS NULL 
            AND o.status = 'approved';
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
  async getRequestedCompanies(): Promise<AllRequestedOrganization[]> {
    const organizations = await this.orgRepository.query(`
            SELECT o.id, o.website, o.description, o.status, o.location, o.created_at, o.updated_at, o.deleted_at, o.organization_id, o.update_password_state,u.id AS "user_id", u.name AS "user_name", u.email AS "user_email", u.phone AS "user_phone",u.role AS "user_role"
            FROM users u
            INNER JOIN organizations o ON u.id = o.organization_id
            WHERE u.role = 'organization' 
            AND u.deleted_at IS NULL 
            AND o.status = 'pending';
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
    const user = await this.userRepository.query(`
            SELECT * FROM users WHERE role = 'user' AND deleted_at IS NULL
            `);
    return user;
  }
  async deleteUser(id: string): Promise<DeleteUserResponse> {
    try {
      const [user] = await this.userRepository.query(
        `SELECT id, name FROM users WHERE id = $1 AND deleted_at IS NULL`,
        [id]
      );
  
      if (!user) {
        throw new Error('User not found or already deleted');
      }
      await this.userRepository.query('BEGIN');
  
      try {
        await this.userRepository.query(
          `UPDATE users SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL`,
          [id]
        );

        await this.userDetailsRepository.query(
          `UPDATE userdetails SET deleted_at = NOW() WHERE user_id = $1 AND deleted_at IS NULL`,
          [id]
        );
  
        await this.jobAppliedRepository.query(
          `UPDATE jobapplied SET deleted_at = NOW() WHERE user_id = $1 AND deleted_at IS NULL`,
          [id]
        );
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
    await this.orgRepository.query(
        `UPDATE organizations SET deleted_at = NOW() WHERE id = $1 AND deleted_At IS NULL`,[input.id]
    );
    console.log('deleting for organization',organization.organization_id);
    
    await this.userRepository.query(
        `UPDATE users SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL`,[organization.organization_id]
    );

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
    // const organization = await this.orgRepository.findOne({
    //   where: { id: input.id },
    // });

    // console.log("it is taking the id ", input.id);

    const hashedPassword = await bcrypt.hash(input.password, 10);
    
    // update password in user table
    await this.userRepository.query(
      `
            UPDATE users SET password = $1 WHERE id = $2 AND deleted_at IS NULL
            `,
      [hashedPassword, input.id]
    );

    // update password state
    await this.orgRepository.query(
      `
            UPDATE organizations SET update_password_state = true WHERE organization_id = $1 AND deleted_at IS NULL
            `,
      [input.id]
    );

    console.log("the password is ", input.password);

    return {
      update_password_state: true,
    };
  }
  async updateOrganizationStatus(input : UpdateOrganizationStatusInput):Promise<UpdateOrganizationStatusResponse>
  {
    const organization = this.orgRepository.findOne({where:{id:input.id}});
    await this.orgRepository.query(`
        UPDATE organizations SET status = $1 WHERE id = $2
        `,[input.status,input.id]);
    return {id:input.id , status:input.status};
  }
  async countOrganizations():Promise<Number>
  {
    const result = await this.userRepository.query(
      `SELECT COUNT(id) FROM users WHERE role = 'organization' AND deleted_at IS NULL`
    );
    const count = parseInt(result[0].count);
    console.log('The organization count is', count);

    return count;
  }
  async countUsers():Promise<Number>
  {
    const result = await this.userRepository.query(
      `SELECT COUNT(id) FROM users WHERE role = 'user' AND deleted_at IS NULL`
    );
    const count = parseInt(result[0].count);
    return count;
  }
  async countJobPosts():Promise<Number>
  {
    const result = await this.jobpostRepository.query(
      `SELECT COUNT(id) FROM jobposts WHERE deleted_at IS NULL`
    );
    const count = parseInt(result[0].count);
    return count;
  }
}
