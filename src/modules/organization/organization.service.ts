import { Organization } from "./entity/organization.entity";
import { User, UserRole } from "../user/entity/user.entity";
import { OrganizationInput } from "./input";
import { UserInput } from "../user/input";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dataSource from "../../database/data-source";
import { Service } from "typedi";

@Service()
export class OrganizationService {
  private userRepository = dataSource.getRepository(User);
  private orgRepository = dataSource.getRepository(Organization);

  async signUpOrganization(
    input: OrganizationInput,
    userInput: UserInput
  ): Promise<Organization> {
    try {
      console.log('came to service');
      
      const { website, status = "pending", description = "", location = "" } = input;
      const { name, email, phone } = userInput;

      const normalizedEmail = email.toLowerCase();
      const userId = uuidv4();
      const orgId = uuidv4();
      const existingUser = await this.userRepository.findOne({ 
        where: { email: normalizedEmail } 
      });
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Create user
      const defaultPassword = "Pass@123"; // More secure default password
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      const user = new User();
      user.id = userId;
      user.name = name;
      user.email = normalizedEmail;
      user.phone = phone;
      user.password = hashedPassword;
      user.role = UserRole.ORGANIZATION;
      
      const savedUser = await this.userRepository.save(user);

      // Create organization
      const organization = new Organization();
      organization.id = orgId;
      organization.user = savedUser.id;
      organization.website = website;
      organization.description = description;
      organization.status = status;
      organization.location = location;

      const savedOrganization = await this.orgRepository.save(organization);

      console.log('Organization created successfully:', savedOrganization);
      return savedOrganization;

    } catch (error) {
      console.error("Error in signUpOrganization service:", error);
      throw error;
    }
  }
}