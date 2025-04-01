import { ObjectType, Field, } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  token!: string;
}


@ObjectType()
export class JobPostResponse {
  @Field()
  id!: string;

  @Field()
  job_title!: string;

  @Field()
  category!: string;

  @Field()
  openings!: string;

  @Field()
  experience!: string;

  @Field()
  description!: string;

  @Field()
  package!: string;

  @Field()
  language!: string;

  @Field()
  skills!: string;

  @Field()
  organization_id!: string;

  @Field()
  organization_name!: string;

}
@ObjectType()
export class JobApplyResponse{
  @Field()
  id!:string

  @Field()
  jobpost_id!:string

  @Field()
  user_id!:string

  @Field()
  organization_id!:string

  @Field()
  status!:string
}
@ObjectType()
export class JobAppliedByUserResponse{
  @Field()
  id!:string

  @Field()
  jobpost_id!:string

  @Field()
  user_id!:string

  @Field()
  organization_id!:string

  @Field()
  status!:string

  @Field()
  name!:string

  @Field()
  email!:string

  @Field()
  job_title!:string

  @Field()
  category!:string

  @Field()
  company!:string

  @Field()
  openings!:string

  @Field()
  skills!:string
}
@ObjectType()
export class UserDetailsResponse{
  @Field()
  id!:string

  @Field()
  name!:string

  @Field()
  email!:string

  @Field() 
  phone?: string;

  @Field() 
  age?: string;

  @Field()
  experience?: string;

  @Field()
  skills?:string

  @Field()
  description?:string

  @Field({ nullable: true })
  resumeUrl?: string;

}
@ObjectType()
export class WithdrawApplicationResponse{
  @Field()
  id!:string
}
@ObjectType()
export class SignedUrlResponse {
  @Field()
  url?: string;

  @Field()
  key?: string;
}

@ObjectType()
export class FileUploadResponse {
  @Field()
  url?: string;

  @Field()
  key?: string;
}

