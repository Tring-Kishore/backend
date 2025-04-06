import { Arg, Mutation, Query, Resolver , ID, Int } from "type-graphql";
import { Service } from "typedi";
import { AllApprovedOrganization, AllRequestedOrganization, DeleteOrganizationResponse, DeleteUserResponse, GetAllUser, UpdateOrganizationPasswordResponse, UpdateOrganizationStatusResponse } from "./response";
import { AdminService } from "./admin.service";
import { DeleteOrganizationInput, UpdateOrganizationPasswordInput, UpdateOrganizationStatusInput } from "./input";

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
    // @Query(() => [AllRequestedOrganization],{
    //     description:"Getting all Requested ORganization"
    // })
    // async getRequestedCompanies(): Promise<AllRequestedOrganization[]>{
    //     return this.adminService.getRequestedCompanies();
    // }
    @Query(() => [GetAllUser],{
        description:"Getting all users"
    })
    async users() : Promise<GetAllUser[]>{
        return this.adminService.users();
    }
    @Mutation(() => DeleteUserResponse)
    async deleteUser(@Arg("id", () => ID) id:string) : Promise<DeleteUserResponse>
    {
        return this.adminService.deleteUser(id);
    }
    @Mutation(() => DeleteOrganizationResponse)
    async deleteOrganization(@Arg("input")input: DeleteOrganizationInput):Promise<DeleteOrganizationResponse>
    {
        return this.adminService.deleteOrganization(input);
    }
    @Mutation(() => UpdateOrganizationPasswordResponse)
    async updateOrganizationPassword(@Arg("input") input:UpdateOrganizationPasswordInput):Promise<UpdateOrganizationPasswordResponse>
    {
        return this.adminService.updateOrganizationPassword(input);
    }
    @Mutation(() => UpdateOrganizationStatusResponse)
    async updateOrganizationStatus(@Arg("input") input:UpdateOrganizationStatusInput):Promise<UpdateOrganizationStatusResponse>
    {
        return this.adminService.updateOrganizationStatus(input);
    }
    @Query(() => Number)
    async countOrganizations():Promise<Number>
    {
        return this.adminService.countOrganizations();
    }
    @Query(() => Number)
    async countUsers():Promise<Number>
    {
        return this.adminService.countUsers();
    }
    @Query(() => Number)
    async countJobPosts():Promise<Number>
    {
        return this.adminService.countJobPosts();
    }
}