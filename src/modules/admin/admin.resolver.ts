import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { AllApprovedOrganization, AllRequestedOrganization, DeleteOrganizationResponse, DeleteUserResponse, GetAllUser } from "./response";
import { AdminService } from "./admin.service";

@Resolver()
@Service()
export class AdminResolver{
    constructor(
        private adminService = new AdminService()
    ){}
    @Query(() => [AllApprovedOrganization],{
        description:"Getting all the approved organization"
    })
    async getAllOrganizations(): Promise<AllApprovedOrganization[]>{
        return this.adminService.getAllOrganizations();
    }
    @Query(() => [AllRequestedOrganization],{
        description:"Getting all Requested ORganization"
    })
    async getRequestedCompanies(): Promise<AllRequestedOrganization[]>{
        return this.adminService.getRequestedCompanies();
    }
    @Query(() => [GetAllUser],{
        description:"Getting all users"
    })
    async users() : Promise<GetAllUser[]>{
        return this.adminService.users();
    }
    @Mutation(() => DeleteUserResponse)
    async deleteUser(@Arg("id") id:string) : Promise<DeleteUserResponse>
    {
        return this.adminService.deleteUser(id);
    }
    @Mutation(() => DeleteOrganizationResponse)
    async DeleteOrganizationResponse(@Arg("id") id:string):Promise<DeleteOrganizationResponse>
    {
        return this.adminService.deleteOrganization(id);
    }

}