import { Arg, Mutation, Resolver } from "type-graphql";
import { Organization } from "./entity/organization.entity";
import { OrganizationService } from "./organization.service";
import { OrganizationInput } from "./input";
import { UserInput } from "../user/input";
import { Service } from "typedi";

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
}