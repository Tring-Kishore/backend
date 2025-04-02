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
exports.UpdatJobAppliedStatusResponse = exports.GetJobAppliedApplicationsResponse = exports.UpdateJobPostResponse = exports.GetAllJobPostByOrganizationResponse = exports.AddJobPostResponse = void 0;
const type_graphql_1 = require("type-graphql");
let AddJobPostResponse = class AddJobPostResponse {
};
exports.AddJobPostResponse = AddJobPostResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "job_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "openings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "package", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "language", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostResponse.prototype, "organization_id", void 0);
exports.AddJobPostResponse = AddJobPostResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AddJobPostResponse);
let GetAllJobPostByOrganizationResponse = class GetAllJobPostByOrganizationResponse {
};
exports.GetAllJobPostByOrganizationResponse = GetAllJobPostByOrganizationResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "job_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "openings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "package", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "language", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationResponse.prototype, "organization_id", void 0);
exports.GetAllJobPostByOrganizationResponse = GetAllJobPostByOrganizationResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetAllJobPostByOrganizationResponse);
let UpdateJobPostResponse = class UpdateJobPostResponse {
};
exports.UpdateJobPostResponse = UpdateJobPostResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "job_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "openings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "package", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "language", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostResponse.prototype, "skills", void 0);
exports.UpdateJobPostResponse = UpdateJobPostResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UpdateJobPostResponse);
let GetJobAppliedApplicationsResponse = class GetJobAppliedApplicationsResponse {
};
exports.GetJobAppliedApplicationsResponse = GetJobAppliedApplicationsResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "jobpost_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "user_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "organization_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "job_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "company", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "openings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsResponse.prototype, "skills", void 0);
exports.GetJobAppliedApplicationsResponse = GetJobAppliedApplicationsResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetJobAppliedApplicationsResponse);
let UpdatJobAppliedStatusResponse = class UpdatJobAppliedStatusResponse {
};
exports.UpdatJobAppliedStatusResponse = UpdatJobAppliedStatusResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdatJobAppliedStatusResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdatJobAppliedStatusResponse.prototype, "status", void 0);
exports.UpdatJobAppliedStatusResponse = UpdatJobAppliedStatusResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UpdatJobAppliedStatusResponse);
