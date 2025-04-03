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
exports.JobApplied = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
const jobPost_entity_1 = require("./jobPost.entity");
let JobApplied = class JobApplied {
};
exports.JobApplied = JobApplied;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplied.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], JobApplied.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], JobApplied.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], JobApplied.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deleted_at", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], JobApplied.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jobPost_entity_1.JobPost, jobPost => jobPost.applications),
    (0, typeorm_1.JoinColumn)({ name: "jobpost_id" }),
    (0, type_graphql_1.Field)(() => jobPost_entity_1.JobPost),
    __metadata("design:type", jobPost_entity_1.JobPost)
], JobApplied.prototype, "jobPost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.jobApplications),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], JobApplied.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "organization_id" }),
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], JobApplied.prototype, "organization", void 0);
exports.JobApplied = JobApplied = __decorate([
    (0, typeorm_1.Entity)({ name: "jobapplied" }),
    (0, type_graphql_1.ObjectType)()
], JobApplied);
