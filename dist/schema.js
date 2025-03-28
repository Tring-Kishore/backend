"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const user_resolver_1 = require("../src/modules/user/user.resolver");
const type_graphql_1 = require("type-graphql");
const createSchema = () => (0, type_graphql_1.buildSchema)({
    resolvers: [user_resolver_1.UserResolver], // Add your resolvers here
    validate: false,
});
exports.createSchema = createSchema;
