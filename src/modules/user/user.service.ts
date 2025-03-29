import { getRepository } from "typeorm";
import { User, UserRole } from "./entity/user.entity";
import { UserDetails } from "./entity/userDetails.entity";
import { LoginInput, UserInput } from "./input";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Service } from "typedi";
import dataSource from "../../database/data-source";
import { OrganizationService } from "../../modules/organization/organization.service";
import { Organization } from "../organization/entity/organization.entity";
import * as jwt from "jsonwebtoken";
import { LoginResponse } from "./response";
@Service()
export class UserService {
   constructor(
    private userRepository = dataSource.getRepository(User),
  private userDetailsRepository = dataSource.getRepository(UserDetails),
  private orgRepository = dataSource.getRepository(Organization),
  ) {}
  

  
  async signUpUser(input: UserInput): Promise<User> {
    try {
      console.log("Service received input:", input);
      const { name, email, phone, password } = input;
      const normalizedEmail = email.toLowerCase();

      const existingUser = await this.userRepository.findOne({
        where: { email: normalizedEmail },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();

      
      // const user = new User();
      // user.id = userId;
      // user.name = name;
      // user.email = normalizedEmail;
      // user.phone = phone;
      // user.password = hashedPassword;
      // user.role = "user";
      // {      id:userId,
      //   name : name,
      //   email : normalizedEmail,
      //   phone : phone,
      //   password : hashedPassword,
      //   role : "user"}

      const savedUser = await this.userRepository.save( {id:userId,
        name : name,
        email : normalizedEmail,
        phone : phone,
        password : hashedPassword,
        role : UserRole.USER});

      console.log('the saved user ',savedUser);
      
      const userDetails = await this.userDetailsRepository.save({
        id: uuidv4(),
        userId: savedUser.id,
        age: 18,
        experience : "-",
        skills: "-",
        description:"-",
      })
      // userDetails.id = uuidv4();

      

      // userDetails.user = userId;
      // userDetails.age = 18;
      // userDetails.experience = "-";
      // userDetails.skills = "-";
      // userDetails.description = "-";

      // await this.userDetailsRepository.save(userDetails);

      console.log("User created successfully:", savedUser);
      return savedUser;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    try {
      const {email, password} = input;
      console.log('the service in the login',input);
      
      const normalizedEmail = email.toLowerCase();
      
      const [user] = await this.userRepository.query(
        `SELECT id, name, email, password, role FROM users WHERE email = $1`, 
        [normalizedEmail]
      );
  
      if (!user) {
        throw new Error('User Not found');
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      let updatePasswordState = false
      if (user.role === 'organization') {
        const [organization] = await this.orgRepository.query(
          `SELECT update_password_state FROM organizations WHERE organization_id = $1 AND deleted_at IS NULL`,
          [user.id]
        );
        
        if (organization) {
          updatePasswordState = organization.update_password_state;
        }
      }
  
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not configured');
      }
  
      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          role: user.role,
          update_password_state: updatePasswordState
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
      );
      console.log('the token datas ',user.id, " ",user.name , " ",user.role, " ",updatePasswordState);
      
      console.log('the service of token ',token);
      
      return {token : token};
    } catch(error) {
      console.error('Login Error', error);
      throw error;
    }
  }
}
