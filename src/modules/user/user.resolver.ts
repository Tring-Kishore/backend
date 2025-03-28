import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { LoginInput, UserInput } from "./input";
import { getRepository } from "typeorm";
import { Service } from "typedi";
console.log('the resolver of user');

@Resolver()
@Service()
export class UserResolver {
  constructor(
    private userService = new UserService()
  ){}

  @Mutation(() => User)
  async signUpUser(@Arg("input") input: UserInput): Promise<User> {
    console.log("the input in resolver", input);
    // console.log("the resolver", this.userService);
    // console.log('the output is ',this.userService.signUpUser(input));

    return this.userService.signUpUser(input);
  }
  // @Query(() => User)
  // async login(@Arg("input") input: LoginInput): Promise<string> {
  //   return this.userService.login(input);
  // }
}
