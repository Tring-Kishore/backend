import { Field, ID, ObjectType } from "type-graphql";
@ObjectType()
export class GetAllUser{
    @Field()
    id!:string

    @Field()
    name!:string

    @Field()
    email!:string

    @Field()
    phone!:string

    @Field()
    role!: string;

    // @Field({nullable:true})
    // deleted_at?:Date
}
@ObjectType()
class AdminOganizationUser{
    @Field()
    id!:string

    @Field()
    name!:string

    @Field()
    email!:string

    @Field()
    phone!:string

    @Field()
    role!: string;
}
@ObjectType()
export class AllApprovedOrganization{
    @Field()
    id!:string;

    @Field()
    website!:string;

    @Field()
    description!: string;

    @Field()
    status!:string;

    @Field()
    location!:string;

    @Field()
    created_at!: Date;

    @Field({ nullable: true })
    updated_at?: Date;

    @Field({ nullable: true })
    deleted_at?: Date;

    @Field()
    organization_id!: string;

    @Field()
    update_password_state!: boolean;

    @Field(() => AdminOganizationUser)
    user!: AdminOganizationUser;

}
@ObjectType()
export class AllRequestedOrganization{
    @Field()
    id!:string;

    @Field()
    website!:string;

    @Field()
    description!: string;

    @Field()
    status!:string;

    @Field()
    location!:string;

    @Field()
    created_at!: Date;

    @Field({ nullable: true })
    updated_at?: Date;

    @Field({ nullable: true })
    deleted_at?: Date;

    @Field()
    organization_id!: string;

    @Field()
    update_password_state!: boolean;

    @Field(() => AdminOganizationUser)
    user!: AdminOganizationUser;

}
@ObjectType()
export class DeleteUserResponse{
    @Field(() => ID)
    id!:string

    @Field()
    name!:string
}
@ObjectType()
class DeleteOrganizationUserDetilts{
    @Field()
    id!:string

    @Field()
    name!:string

    @Field()
    email!:string

}
@ObjectType()
export class DeleteOrganizationResponse{
    @Field()
    id!:string
}
@ObjectType()
export class UpdateOrganizationPasswordResponse{
    @Field()
    update_password_state!:boolean
}
@ObjectType()
export class UpdateOrganizationStatusResponse{
    @Field()
    id!:string

    @Field()
    status!:string
}
@ObjectType()
export class UpdateJobPostStatusResponse {
    @Field()
    id!: string;

    @Field()
    status!: string;
  }
  