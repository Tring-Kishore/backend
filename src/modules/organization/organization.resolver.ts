import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Organization } from "./entity/organization.entity";
import { OrganizationService } from "./organization.service";
import { AddJobPostInput, GetAllJobPostByOrganizationInput, GetJobAppliedApplicationsInput, OrganizationIdInput, OrganizationInput, UpdateJobPostInput, UpdatJobAppliedStatusInput } from "./input";
import { UserInput } from "../user/input";
import { Service } from "typedi";
import { AddJobPostResponse, GetAllJobPostByOrganizationResponse, GetJobAppliedApplicationsResponse, UpdateJobPostResponse, UpdatJobAppliedStatusResponse } from "./organization.response";

@Resolver()
@Service()
export class OrganizationResolver {
  constructor(
    private organizationService = new OrganizationService()
  ) {}

  @Mutation(() => Organization)
  async signUpOrganization(
    @Arg("input") input: OrganizationInput,
    @Arg("signUpUserInput2") userInput: UserInput
  ): Promise<Organization> {
    try {
      console.log('Organization input:', input);
      console.log('User input:', userInput);
      
      const result = await this.organizationService.signUpOrganization(input, userInput);
      
      console.log('Organization created:', result);
      return result;
    } catch (error) {
      console.error('Error in organization resolver:', error);
      throw error;
    }
  }
  // adding job post
  @Mutation(() =>AddJobPostResponse)
  async addJobPost(@Arg("input")input:AddJobPostInput):Promise<AddJobPostResponse>
  {
    return this.organizationService.addJobPost(input);
  }
  // get job post posted by organization
  @Query(() => [GetAllJobPostByOrganizationResponse])
  async jobPosts(@Arg("input")input:GetAllJobPostByOrganizationInput):Promise<GetAllJobPostByOrganizationResponse[]>
  {
    return  this.organizationService.jobPosts(input);
  }
  //Update job post
  @Mutation(() => UpdateJobPostResponse)
  async updateJobPost(@Arg("input")input:UpdateJobPostInput):Promise<UpdateJobPostResponse>
  {
    return this.organizationService.updateJobPost(input);
  }
  //getting job apllications
  @Query(() => [GetJobAppliedApplicationsResponse])
  async jobApplied(@Arg("input")input:GetJobAppliedApplicationsInput):Promise<GetJobAppliedApplicationsResponse[]>
  {
    return this.organizationService.jobApplied(input);
  }
  @Mutation(() => UpdatJobAppliedStatusResponse)
  async updateApplicationStatus(@Arg("input")input:UpdatJobAppliedStatusInput):Promise<UpdatJobAppliedStatusResponse>
  {
    return this.organizationService.updateApplicationStatus(input);
  }
  @Query(() => Number)
  async countOrganizationJobPosts(@Arg("input")input:OrganizationIdInput):Promise<Number>
  {
    return this.organizationService.countOrganizationJobPosts(input);
  }
  @Query(() => Number)
  async countOrganizationApplications(@Arg("input")input:OrganizationIdInput):Promise<Number>
  {
    return this.organizationService.countOrganizationApplications(input);
  }
  
}