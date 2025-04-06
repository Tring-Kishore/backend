import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AddJobPostResponse{
    @Field()
    id!:string

    @Field()
    job_title!:string

    @Field()
    category!:string

    @Field()
    openings!:string

    @Field()
    experience!:string

    @Field()
    description!:string

    @Field()
    package!:string

    @Field()
    language!:string

    @Field()
    skills!:string

    @Field()
    organization_id!:string
}
@ObjectType()
export class GetAllJobPostByOrganizationResponse{
    @Field()
    id!:string

    @Field()
    job_title!:string

    @Field()
    category!:string

    @Field()
    openings!:string

    @Field()
    experience!:string

    @Field()
    description!:string

    @Field()
    package!:string

    @Field()
    language!:string

    @Field()
    skills!:string

    @Field()
    organization_id!:string

    @Field()
    status!:string;

}
@ObjectType()
export class UpdateJobPostResponse{
    @Field()
  id!:string

  @Field()
  job_title!:string

  @Field()
  category!:string

  @Field()
  openings!:string

  @Field()
  experience!:string

  @Field()
  description!:string

  @Field()
  package!:string

  @Field()
  language!:string

  @Field()
  skills!:string
  
}
@ObjectType()
export class GetJobAppliedApplicationsResponse{
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

  @Field({nullable:true})
  resumeKey!:string
}
@ObjectType()
export class UpdatJobAppliedStatusResponse{
    @Field()
    id!:string
  
    @Field()
    status!:string
  }