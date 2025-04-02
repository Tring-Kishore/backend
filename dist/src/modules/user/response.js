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
exports.FileUploadResponse = exports.SignedUrlResponse = exports.WithdrawApplicationResponse = exports.UserDetailsResponse = exports.JobAppliedByUserResponse = exports.JobApplyResponse = exports.JobPostResponse = exports.LoginResponse = void 0;
const type_graphql_1 = require("type-graphql");
let LoginResponse = class LoginResponse {
};
exports.LoginResponse = LoginResponse;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginResponse.prototype, "token", void 0);
exports.LoginResponse = LoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResponse);
let JobPostResponse = class JobPostResponse {
};
exports.JobPostResponse = JobPostResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "job_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "openings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "package", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "language", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "organization_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobPostResponse.prototype, "organization_name", void 0);
exports.JobPostResponse = JobPostResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], JobPostResponse);
let JobApplyResponse = class JobApplyResponse {
};
exports.JobApplyResponse = JobApplyResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplyResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplyResponse.prototype, "jobpost_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplyResponse.prototype, "user_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplyResponse.prototype, "organization_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplyResponse.prototype, "status", void 0);
exports.JobApplyResponse = JobApplyResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], JobApplyResponse);
let JobAppliedByUserResponse = class JobAppliedByUserResponse {
};
exports.JobAppliedByUserResponse = JobAppliedByUserResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "jobpost_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "user_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "organization_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "job_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "company", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "openings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserResponse.prototype, "skills", void 0);
exports.JobAppliedByUserResponse = JobAppliedByUserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], JobAppliedByUserResponse);
let UserDetailsResponse = class UserDetailsResponse {
};
exports.UserDetailsResponse = UserDetailsResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "age", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserDetailsResponse.prototype, "resumeUrl", void 0);
exports.UserDetailsResponse = UserDetailsResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserDetailsResponse);
let WithdrawApplicationResponse = class WithdrawApplicationResponse {
};
exports.WithdrawApplicationResponse = WithdrawApplicationResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WithdrawApplicationResponse.prototype, "id", void 0);
exports.WithdrawApplicationResponse = WithdrawApplicationResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], WithdrawApplicationResponse);
let SignedUrlResponse = class SignedUrlResponse {
};
exports.SignedUrlResponse = SignedUrlResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SignedUrlResponse.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SignedUrlResponse.prototype, "key", void 0);
exports.SignedUrlResponse = SignedUrlResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], SignedUrlResponse);
let FileUploadResponse = class FileUploadResponse {
};
exports.FileUploadResponse = FileUploadResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FileUploadResponse.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FileUploadResponse.prototype, "key", void 0);
exports.FileUploadResponse = FileUploadResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], FileUploadResponse);
