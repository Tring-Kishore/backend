import { Organization } from "./entity/organization.entity";
import { User, UserRole } from "../user/entity/user.entity";
import { AddJobPostInput, GetAllJobPostByOrganizationInput, GetJobAppliedApplicationsInput, OrganizationIdInput, OrganizationInput, UpdateJobPostInput, UpdatJobAppliedStatusInput } from "./input";
import { UserInput } from "../user/input";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dataSource from "../../database/data-source";
import { Service } from "typedi";
import { AddJobPostResponse, GetAllJobPostByOrganizationResponse, GetJobAppliedApplicationsResponse, UpdateJobPostResponse, UpdatJobAppliedStatusResponse} from "./organization.response";
import { JobPost } from "../jobs/entity/jobPost.entity";
import { JobApplied } from "../jobs/entity/jobApplied.entity";
import { generatePassword } from "../../../utils/passwordGenerator";
import { sendEmail } from "../../../utils/emailSender";

@Service()
export class OrganizationService {
  constructor(
    private userRepository = dataSource.getRepository(User),
    private orgRepository = dataSource.getRepository(Organization),
    private jobPostRepository = dataSource.getRepository(JobPost),
    private jobAppliedRepository = dataSource.getRepository(JobApplied)
  ){}

  async signUpOrganization(
    input: OrganizationInput,
    userInput: UserInput
  ): Promise<Organization> {
    try {
      console.log('came to service');
      
      const { website, status = "pending", description = "", location = "" } = input;
      const { name, email, phone } = userInput;

      const normalizedEmail = email.toLowerCase();
      const userId = uuidv4();
      const orgId = uuidv4();
      const existingUser = await this.userRepository.findOne({ 
        where: { email: normalizedEmail } 
      });
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Create user
      const defaultPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      const user = new User();
      user.id = userId;
      user.name = name;
      user.email = normalizedEmail;
      user.phone = phone;
      user.password = hashedPassword;
      user.role = UserRole.ORGANIZATION;
      
      const savedUser = await this.userRepository.save(user);

      // Create organization
      const organization = new Organization();
      organization.id = orgId;
      organization.user = { id: userId } as User;
      organization.website = website;
      organization.description = description;
      organization.status = status;
      organization.location = location;

      const savedOrganization = await this.orgRepository.save(organization);

      await sendEmail({
        from: process.env.EMAIL,
        to: normalizedEmail,
        subject: 'Wait until admin approve',
        text: 'Welcome to Job Found, You have signed up, wait until admin accepts',
      });

      console.log('Organization created successfully:', savedOrganization);
      return savedOrganization;

    } catch (error) {
      console.error("Error in signUpOrganization service:", error);
      throw error;
    }
  }
  async addJobPost(input:AddJobPostInput):Promise<AddJobPostResponse>
  {
    const id = uuidv4();

      const [result] = await this.jobPostRepository.query(
        `INSERT INTO jobposts (
          id, job_title, category, openings, experience, description, package, language, skills, organization_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          id,input.job_title,input.category,input.openings,input.experience,input.description,input.package,input.language,input.skills,input.organization_id,
        ]
      );
      return result;
  }
  async jobPosts(input:GetAllJobPostByOrganizationInput):Promise<GetAllJobPostByOrganizationResponse[]>
  {
    const posts = this.jobPostRepository.query(
      `SELECT id, job_title, category, openings, experience, description, package, language, skills, organization_id FROM jobposts WHERE organization_id = $1`,[input.id]
    );
    
    
    console.log('the posts are ',posts);
    
    return posts;
  }
  async updateJobPost(input:UpdateJobPostInput):Promise<UpdateJobPostResponse>
  {
    await this.jobPostRepository.query(
      `UPDATE jobposts SET job_title = $1, category = $2, openings = $3, experience = $4, description = $5, package = $6, language = $7, skills = $8 WHERE id = $9
       RETURNING *`,
      [input.job_title,input.category,input.openings,input.experience,input.description,input.package,input.language,input.skills,input.id]);

      const updatePost = await this.jobPostRepository.findOne({where:{id:input.id},select:['id','job_title','category','openings','experience','description','package','language','skills']});
      return updatePost as UpdateJobPostResponse;
  }
  async jobApplied(input:GetJobAppliedApplicationsInput):Promise<GetJobAppliedApplicationsResponse[]>
  {
    const result = await this.jobAppliedRepository.query(
      `SELECT 
        ja.id, ja.jobpost_id, ja.organization_id, ja.user_id, ja.status, ja.created_at, ja.updated_at,
        u.name, u.email,
        jp.job_title, jp.category, jp.openings, jp.skills,
        org.name AS company
       FROM jobapplied ja
       JOIN users u ON ja.user_id = u.id
       JOIN jobposts jp ON ja.jobpost_id = jp.id
       JOIN users org ON ja.organization_id = org.id
       WHERE ja.organization_id = $1 AND ja.deleted_at IS NULL`,
      [input.id]
    );
    return result;
  }
  async updateApplicationStatus(input:UpdatJobAppliedStatusInput):Promise<UpdatJobAppliedStatusResponse>
  {
    await this.jobAppliedRepository.update({id:input.id},{status:input.status,updated_at: new Date()});
    const updatedJobApplied = await this.jobAppliedRepository.findOne({where:{id:input.id},select:['id','status']});
    const applicantMail = await this.jobAppliedRepository.query(
      `SELECT user_id FROM jobapplied WHERE id = $1`,[input.id]
    );
    const userEmail = await this.userRepository.findOne({where:{id:applicantMail.user_id}});
    const userId = applicantMail?.[0]?.user_id;
    const userEmail2 : any = await this.userRepository.findOne({ where: { id: userId },select:['email'] });
    await sendEmail({
      from: process.env.EMAIL,
      to: userEmail2.email,
      subject: `Regarding Application Status`,
      text: `Your Application has got ${input.status}`,
    });
    return {id:input.id,status:input.status};
  }
  async countOrganizationJobPosts(input:OrganizationIdInput):Promise<Number>
  {
    const result = await this.jobPostRepository.query(
      `SELECT COUNT(id) FROM jobposts WHERE organization_id = $1 AND deleted_at IS NULL`,
      [input.id]
    );
    const count = parseInt(result[0].count);
    return count;
  }
  async countOrganizationApplications(input:OrganizationIdInput):Promise<Number>
  {
    const result = await this.jobAppliedRepository.query(
      `SELECT COUNT(id) FROM jobapplied WHERE organization_id = $1 AND deleted_at IS NULL`,
      [input.id]
    );
    return parseInt(result[0].count);
  }

  
}