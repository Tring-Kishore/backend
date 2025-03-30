import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { LoginInput, UserInput } from "./input";
import { getRepository } from "typeorm";
import { Service } from "typedi";
import { LoginResponse } from "./response";
console.log("the resolver of user");

@Resolver()
@Service()
export class UserResolver {
  constructor(private userService = new UserService()) {}

  @Mutation(() => User)
  async signUpUser(@Arg("input") input: UserInput): Promise<User> {
    console.log("the input in resolver", input);
    // console.log("the resolver", this.userService);
    // console.log('the output is ',this.userService.signUpUser(input));

    return this.userService.signUpUser(input);
  }
  @Mutation(() => LoginResponse)
  async login(@Arg("input") input: LoginInput): Promise<LoginResponse> {
    console.log("the login input", input);
    const token = await this.userService.login(input);
    console.log('the token in resolver',token);
    return token;
  }
}
