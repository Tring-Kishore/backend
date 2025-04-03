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
exports.Organization = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
const jobPost_entity_1 = require("../../jobs/entity/jobPost.entity");
let Organization = class Organization {
};
exports.Organization = Organization;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Organization.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Organization.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Organization.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deleted_at", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "update_password_state", default: false }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Organization.prototype, "update_password_state", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.organizations),
    (0, typeorm_1.JoinColumn)({ name: "organization_id" }),
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Organization.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobPost_entity_1.JobPost, jobPost => jobPost.organizationId),
    (0, type_graphql_1.Field)(() => [jobPost_entity_1.JobPost], { nullable: true }),
    __metadata("design:type", Array)
], Organization.prototype, "jobPosts", void 0);
exports.Organization = Organization = __decorate([
    (0, typeorm_1.Entity)({ name: "organizations" }),
    (0, type_graphql_1.ObjectType)()
], Organization);
