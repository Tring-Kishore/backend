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
const jobPost_entity_1 = require("./jobPost.entity");
const userDetails_entity_1 = require("../../user/entity/userDetails.entity");
let JobApplied = class JobApplied {
};
exports.JobApplied = JobApplied;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], JobApplied.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplied.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JobApplied.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], JobApplied.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date
    // many job post to one user
    )
], JobApplied.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userDetails_entity_1.UserDetails, (userdetails) => userdetails.jobapplied),
    __metadata("design:type", userDetails_entity_1.UserDetails
    // many to one job applied from oe job post
    )
], JobApplied.prototype, "userdetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jobPost_entity_1.JobPosts, (jobpost) => jobpost.jobapplied),
    __metadata("design:type", jobPost_entity_1.JobPosts)
], JobApplied.prototype, "jobpost", void 0);
exports.JobApplied = JobApplied = __decorate([
    (0, typeorm_1.Entity)({ name: "jobapplied" }),
    (0, type_graphql_1.ObjectType)()
], JobApplied);
