import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class UpdateOrganizationPasswordInput{
    @Field()
    id!:string

    @Field()
    password!:string
}
@InputType()
export class UpdateOrganizationStatusInput{
    @Field()
    id!:string

    @Field()
    status!:string
}
@InputType()
export class DeleteOrganizationInput{
    @Field()
    id!:string
}