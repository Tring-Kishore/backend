import dataSource from "database/data-source";
import { Organization } from "modules/organization/entity/organization.entity";
import { Service } from "typedi";
import { AllApprovedOrganization, AllRequestedOrganization, DeleteOrganizationResponse, DeleteUserResponse, GetAllUser } from "./response";
import { User } from "modules/user/entity/user.entity";

@Service()
export class AdminService{
    constructor(
        private orgRepository = dataSource.getRepository(Organization),
        private userRepository = dataSource.getRepository(User)
    ){}
    async getAllOrganizations(): Promise<AllApprovedOrganization[]> {
        const organizations = await this.orgRepository.query(`
            SELECT o.id, o.website, o.description, o.status, o.location, o.created_at, o.updated_at, o.deleted_at, o.organization_id, o.update_password_state,u.id AS "user_id", u.name AS "user_name", u.email AS "user_email", u.phone AS "user_phone",u.role AS "user_role"
            FROM users u
            INNER JOIN organizations o ON u.id = o.organization_id
            WHERE u.role = 'organization' 
            AND u.deleted_at IS NULL 
            AND o.status = 'approved';
        `);
    
        return organizations.map((org: {
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
                role: org.user_role
            }
        }));
    }
    async getRequestedCompanies(): Promise<AllRequestedOrganization[]>{
        const organizations = await this.orgRepository.query(`
            SELECT o.id, o.website, o.description, o.status, o.location, o.created_at, o.updated_at, o.deleted_at, o.organization_id, o.update_password_state,u.id AS "user_id", u.name AS "user_name", u.email AS "user_email", u.phone AS "user_phone",u.role AS "user_role"
            FROM users u
            INNER JOIN organizations o ON u.id = o.organization_id
            WHERE u.role = 'organization' 
            AND u.deleted_at IS NULL 
            AND o.status = 'pending';
        `);
    
        return organizations.map((org: {
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
                role: org.user_role
            }
        }));
    }
    async users() : Promise<GetAllUser[]>{
        const user = await  this.userRepository.query(`
            SELECT * FROM users WHERE role = 'user' AND deleted_at IS NULL
            `);
        return user.rows;    
    }
    async deleteUser(id:string):Promise<DeleteUserResponse>
    {
        const user = await this.userRepository.query(`
            UPDATE users SET deleted_at = NOW() WHERE id = $1
            `,[id])
        return user.rows[0];    
    }
    async deleteOrganization(id:string) : Promise<DeleteOrganizationResponse>
    {
        const organization = await this.orgRepository.query(`
            UPDATE organization SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL
            `,[id]);
        const user = await this.userRepository.query(`
            UPDATE users SET delete_at = NOW() WHERE id = $1 AND deleted_at IS NULL 
            `,[organization.organization_id]);
            return user.rows[0];
    }
}