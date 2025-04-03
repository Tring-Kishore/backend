import { Arg, Mutation, Query, Resolver , Authorized } from "type-graphql";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import {
  JobAppliedByUserInput,
  JobApplyInput,
  LoginInput,
  UpdateUserInput,
  UploadResumeInput,
  UserIdInput,
  UserInput,
  WithdrawApplicationInput,
} from "./input";
import { getRepository } from "typeorm";
import { Service } from "typedi";
import {
  JobAppliedByUserResponse,
  JobApplyResponse,
  JobPostResponse,
  LoginResponse,
  UploadResumeResponse,
  UserDetailsResponse,
  WithdrawApplicationResponse,
} from "./response";
import { UploadPdfResponse } from "modules/s3/s3.response";
import { UploadPdfInput } from "modules/s3/s3.input";
console.log("the resolver of user");

@Resolver()
@Service()
export class UserResolver {
  constructor(private userService = new UserService(),
) {}


  @Mutation(() => User)
  async signUpUser(@Arg("input") input: UserInput): Promise<User> {
    console.log("the input in resolver", input);
    // console.log("the resolver", this.userService);
    // console.log('the output is ',this.userService.signUpUser(input));

    return this.userService.signUpUser(input);
  }
  @Mutation(() => LoginResponse)
  async login(@Arg("input") input: LoginInput): Promise<LoginResponse> {
    console.log("the login input", input);
    const token = await this.userService.login(input);
    console.log("the token in resolver", token);
    return token;
  }
  @Query(() => [JobPostResponse])
  async allJobPosts(): Promise<JobPostResponse[]> {
    return this.userService.allJobPosts();
  }
  @Mutation(() => JobApplyResponse)
  async applyForJob(
    @Arg("input") input: JobApplyInput
  ): Promise<JobApplyResponse> {
    return this.userService.applyForJob(input);
  }
  @Query(() => [JobAppliedByUserResponse])
  async getUserJobApplied(
    @Arg("input") input: JobAppliedByUserInput
  ): Promise<JobAppliedByUserResponse[]> {
    return this.userService.getUserJobApplied(input);
  }
  @Query(() => Number)
  async countUserApplications(@Arg("input") input: UserIdInput): Promise<Number> {
    return this.userService.countUserApplications(input);
  }
  @Query(() => UserDetailsResponse)
  async user(@Arg("input")input:UserIdInput):Promise<UserDetailsResponse>
  {
    
    return this.userService.user(input);
  }
  @Mutation(() => UserDetailsResponse)
  async updateUser(@Arg("input")input:UpdateUserInput):Promise<UserDetailsResponse>
  {
    
    return this.userService.updateUser(input);
  }
  @Mutation(() => WithdrawApplicationResponse)
  async withdrawApplication(@Arg("input")input:WithdrawApplicationInput):Promise<WithdrawApplicationResponse>
  {
    return this.userService.withdrawApplication(input);
  }
  @Mutation(() => UploadResumeResponse)
  async uploadResume(@Arg("input")input:UploadResumeInput):Promise<UploadResumeResponse>
  {
    return this.userService.uploadResume(input);
  }
 

  

}
