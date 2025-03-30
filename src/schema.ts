import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./modules/user/user.resolver";
import { OrganizationResolver } from "./modules/organization/organization.resolver";
import { QueryResolver } from "./modules/query.resolver";
import { AdminResolver } from "./modules/admin/admin.resolver";

console.log('the user create schema',UserResolver);

export const createSchema = () =>
  buildSchema({
    resolvers: [QueryResolver, UserResolver, OrganizationResolver,AdminResolver],
    validate: false,
  });