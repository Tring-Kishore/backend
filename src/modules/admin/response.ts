import { Field, ObjectType } from "type-graphql";
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
export class DeleteUserResponse{
    @Field({nullable:true})
    id!:string

    @Field({nullable:true})
    name!:string
}
class DeleteOrganizationUserDetilts{
    @Field()
    id!:string

    @Field()
    name!:string

    @Field()
    email!:string

}
export class DeleteOrganizationResponse{
    @Field()
    id!:string

    @Field(() => DeleteOrganizationUserDetilts)
    user!: DeleteOrganizationUserDetilts;
}