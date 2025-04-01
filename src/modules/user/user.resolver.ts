import { Arg, Mutation, Query, Resolver , Authorized } from "type-graphql";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import {
  JobAppliedByUserInput,
  JobApplyInput,
  LoginInput,
  UpdateUserInput,
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
  UserDetailsResponse,
  WithdrawApplicationResponse,
} from "./response";
// import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from "uuid";
// import { FileService } from "../../service/service";
import {
  GetUploadSignedUrlInput,
  GetDownloadSignedUrlInput,
  DirectUploadInput,
} from "../user/input";
import {
  SignedUrlResponse,
  FileUploadResponse,
} from "../user/response";
console.log("the resolver of user");

@Resolver()
@Service()
export class UserResolver {
  constructor(private userService = new UserService(),
  private s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
  }),
  // private fileService = new FileService(),
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
  // @Authorized() // Or whatever auth you need
  // @Mutation(() => SignedUrlResponse)
  // async getUploadSignedUrl(
  //   @Arg("input") input: GetUploadSignedUrlInput
  // ): Promise<SignedUrlResponse> {
  //   return this.fileService.getUploadSignedUrl(input);
  // }

  // @Authorized()
  // @Mutation(() => SignedUrlResponse)
  // async getDownloadSignedUrl(
  //   @Arg("input") input: GetDownloadSignedUrlInput
  // ): Promise<SignedUrlResponse> {
  //   return this.fileService.getDownloadSignedUrl(input);
  // }

  // @Authorized()
  // @Mutation(() => FileUploadResponse)
  // async directUpload(
  //   @Arg("input") input: DirectUploadInput
  // ): Promise<FileUploadResponse> {
  //   return this.fileService.directUpload(input);
  // }

  

}
