"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const user_resolver_1 = require("./modules/user/user.resolver");
const organization_resolver_1 = require("./modules/organization/organization.resolver");
const query_resolver_1 = require("./modules/query.resolver");
const admin_resolver_1 = require("./modules/admin/admin.resolver");
console.log('the user create schema', user_resolver_1.UserResolver);
const createSchema = () => (0, type_graphql_1.buildSchema)({
    resolvers: [query_resolver_1.QueryResolver, user_resolver_1.UserResolver, organization_resolver_1.OrganizationResolver, admin_resolver_1.AdminResolver],
    validate: false,
});
exports.createSchema = createSchema;
