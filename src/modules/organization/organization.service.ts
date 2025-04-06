import { Organization } from "./entity/organization.entity";
import { User, UserRole } from "../user/entity/user.entity";
import {
  AddJobPostInput,
  GetAllJobPostByOrganizationInput,
  GetJobAppliedApplicationsInput,
  OrganizationIdInput,
  OrganizationInput,
  UpdateJobPostInput,
  UpdatJobAppliedStatusInput,
} from "./input";
import { UserInput } from "../user/input";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dataSource from "../../database/data-source";
import { Service } from "typedi";
import {
  AddJobPostResponse,
  GetAllJobPostByOrganizationResponse,
  GetJobAppliedApplicationsResponse,
  UpdateJobPostResponse,
  UpdatJobAppliedStatusResponse,
} from "./organization.response";
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
  ) {}

  async signUpOrganization(
    input: OrganizationInput,
    userInput: UserInput
  ): Promise<Organization> {
    try {
      console.log("came to service");

      const {
        website,
        status = "pending",
        description = "",
        location = "",
      } = input;
      const { name, email, phone } = userInput;

      const normalizedEmail = email.toLowerCase();
      const userId = uuidv4();
      const orgId = uuidv4();
      const existingUser = await this.userRepository.findOne({
        where: { email: normalizedEmail },
      });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const defaultPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      const user = new User();
      user.id = userId;
      user.name = name;
      user.email = normalizedEmail;
      user.phone = phone;
      user.password = hashedPassword;
      user.role = UserRole.ORGANIZATION;

      await this.userRepository.save(user);

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
        subject: "Wait until admin approve",
        text: "Welcome to Job Found, You have signed up, wait until admin accepts",
      });

      console.log("Organization created successfully:", savedOrganization);
      return savedOrganization;
    } catch (error) {
      console.error("Error in signUpOrganization service:", error);
      throw error;
    }
  }
  async addJobPost(input: AddJobPostInput): Promise<AddJobPostResponse> {
    const id = uuidv4();
    const result : any= await this.jobPostRepository.save({
      id: id,
      job_title: input.job_title,
      category: input.category,
      openings: input.openings,
      experience: input.experience,
      description: input.description,
      package: input.package,
      language: input.language,
      skills: input.skills,
      status:'pending',
      organization: {id:input.organization_id},
    });
    return {
      ...result,
      organization_id: result.organization.id
    };
  }
  async jobPosts(
    input: GetAllJobPostByOrganizationInput
  ): Promise<GetAllJobPostByOrganizationResponse[]> {
    const posts = await this.jobPostRepository.find({
      where: { organization: { id: input.id } },
      relations: ["organization"],
    });

    console.log("the posts are ", posts);

    return posts.map((post) => ({
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
    }));
  }
  async updateJobPost(
    input: UpdateJobPostInput
  ): Promise<UpdateJobPostResponse> {
    await this.jobPostRepository.update(
      { id: input.id },
      {
        job_title: input.job_title,
        category: input.category,
        openings: input.openings,
        experience: input.experience,
        description: input.description,
        package: input.package,
        language: input.language,
        skills: input.skills,
      }
    );
    const updatePost = await this.jobPostRepository.findOne({
      where: { id: input.id },
      select: [
        "id",
        "job_title",
        "category",
        "openings",
        "experience",
        "description",
        "package",
        "language",
        "skills",
      ],
    });
    return updatePost as UpdateJobPostResponse;
  }
  async jobApplied(
    input: GetJobAppliedApplicationsInput
  ): Promise<GetJobAppliedApplicationsResponse[]> {
    const result = await this.jobAppliedRepository.query(
      `SELECT 
        ja.id, ja.jobpost_id, ja.organization_id, ja.user_id, ja.status, ja.created_at, ja.updated_at,
        u.name, u.email,
        jp.job_title, jp.category, jp.openings, jp.skills,
        org.name AS company , ud.resume AS "resumeKey"
       FROM jobapplied ja
       JOIN users u ON ja.user_id = u.id
       JOIN userdetails ud ON ud.user_id = u.id
       JOIN jobposts jp ON ja.jobpost_id = jp.id
       JOIN users org ON ja.organization_id = org.id
       WHERE ja.organization_id = $1 AND ja.deleted_at IS NULL`,
      [input.id]
    );
    return result;
  }
  async updateApplicationStatus(
    input: UpdatJobAppliedStatusInput
  ): Promise<UpdatJobAppliedStatusResponse> {
    await this.jobAppliedRepository.update(
      { id: input.id },
      { status: input.status, updated_at: new Date() }
    );
    const jobApplied = await this.jobAppliedRepository.findOne({
      where: { id: input.id },
      relations: ["user"],
      select: ["id", "status", "user"],
    });

    if (!jobApplied || !jobApplied.user) {
      throw new Error("Job application or user not found");
    }

    
    await sendEmail({
      from: process.env.EMAIL,
      to: jobApplied.user.email,
      subject: `Regarding Application Status`,
      text: `Your Application has got ${input.status}`,
    });

    return { id: input.id, status: input.status };
  }
  async countOrganizationJobPosts(input: OrganizationIdInput): Promise<Number> {
    const result = await this.jobPostRepository.count({where:{organization:{id:input.id}}});
    return result;
  }
  async countOrganizationApplications(
    input: OrganizationIdInput
  ): Promise<Number> {
    const result = await this.jobAppliedRepository.count({where:{organization:{id:input.id}}});
    return result;
  }
}
