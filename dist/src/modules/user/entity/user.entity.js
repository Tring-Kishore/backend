"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const userDetails_entity_1 = require("./userDetails.entity");
const organization_entity_1 = require("../../organization/entity/organization.entity");
const jobPost_entity_1 = require("../../jobs/entity/jobPost.entity");
const jobApplied_entity_1 = require("../../jobs/entity/jobApplied.entity");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["ORGANIZATION"] = "organization";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deleted_at", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userDetails_entity_1.UserDetails, details => details.userId),
    (0, type_graphql_1.Field)(() => userDetails_entity_1.UserDetails, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => organization_entity_1.Organization, organization => organization.user),
    (0, type_graphql_1.Field)(() => [organization_entity_1.Organization], { nullable: true }),
    __metadata("design:type", organization_entity_1.Organization)
], User.prototype, "organizations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobPost_entity_1.JobPost, jobPost => jobPost.organizationId),
    (0, type_graphql_1.Field)(() => [jobPost_entity_1.JobPost], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "jobPosts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobApplied_entity_1.JobApplied, application => application.user),
    (0, type_graphql_1.Field)(() => [jobApplied_entity_1.JobApplied], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "jobApplications", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: "users" }),
    (0, type_graphql_1.ObjectType)()
], User);
