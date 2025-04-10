import { Query, Resolver } from "type-graphql";

@Resolver()
export class QueryResolver {
  @Query(() => String)
  hello(): string {
    return "Hello World!";
  }
}