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
exports.JobPosts = void 0;
const organization_entity_1 = require("../../organization/entity/organization.entity");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const jobApplied_entity_1 = require("./jobApplied.entity");
let JobPosts = class JobPosts {
};
exports.JobPosts = JobPosts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], JobPosts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPosts.prototype, "job_title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPosts.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPosts.prototype, "openings", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPosts.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPosts.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPosts.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPosts.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPosts.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JobPosts.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], JobPosts.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date
    // many to one -> many job to one organization
    )
], JobPosts.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, (organization) => organization.jobpost),
    __metadata("design:type", organization_entity_1.Organization
    //one to many , one post many applied
    )
], JobPosts.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobApplied_entity_1.JobApplied, (jobapplied) => jobapplied.jobpost),
    __metadata("design:type", Array)
], JobPosts.prototype, "jobapplied", void 0);
exports.JobPosts = JobPosts = __decorate([
    (0, typeorm_1.Entity)({ name: "jobposts" }),
    (0, type_graphql_1.ObjectType)()
], JobPosts);
