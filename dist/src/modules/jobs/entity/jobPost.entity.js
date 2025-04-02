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
exports.JobPost = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
const jobApplied_entity_1 = require("./jobApplied.entity");
let JobPost = class JobPost {
};
exports.JobPost = JobPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "job_title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "openings", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPost.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], JobPost.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], JobPost.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deleted_at", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], JobPost.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.jobPosts),
    (0, typeorm_1.JoinColumn)({ name: "organization_id" }),
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", String)
], JobPost.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobApplied_entity_1.JobApplied, application => application.jobPost),
    (0, type_graphql_1.Field)(() => [jobApplied_entity_1.JobApplied], { nullable: true }),
    __metadata("design:type", Array)
], JobPost.prototype, "applications", void 0);
exports.JobPost = JobPost = __decorate([
    (0, typeorm_1.Entity)({ name: "jobposts" }),
    (0, type_graphql_1.ObjectType)()
], JobPost);
