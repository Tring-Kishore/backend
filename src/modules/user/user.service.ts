import { getRepository } from "typeorm";
import { User } from "./entity/user.entity";
import { UserDetails } from "./entity/userDetails.entity";
import { LoginInput, UserInput } from "./input";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Service } from "typedi";
import dataSource from "../../database/data-source";
@Service()
export class UserService {
   constructor(
    private userRepository = dataSource.getRepository(User),
  private userDetailsRepository = dataSource.getRepository(UserDetails)
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
        role : "user"});

      console.log('the saved user ',savedUser);
      
      const userDetails = await this.userDetailsRepository.save({
        id: uuidv4(),
        user: userId,
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

  // async login(input : LoginInput) : Promise<string>{
  //   const {email,password} = input;
  //   const normalizedEmail = email.toLowerCase();
  //   const user = await this.userRepository.findOne({
  //     where :{email : normalizedEmail , deleted_at:null},
  //     select:['id','name','email','role','password']
  //   });

  //   if(!user)
  //   {
  //     throw new Error('User Not found');
  //   }

  //   const isValidPassword = await bcrypt.compare(password,user.password);
  //   if(!isValidPassword)
  //   {
  //     throw new Error('Invalid Password');
  //   }

  //   let updatePasswordState = null;
  //   if(user.role === 'organization')
  //   {
  //     const  organization = 
  //   }
    

  
}
