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
exports.OrganizationIdInput = exports.UpdatJobAppliedStatusInput = exports.GetJobAppliedApplicationsInput = exports.UpdateJobPostInput = exports.GetAllJobPostByOrganizationInput = exports.AddJobPostInput = exports.UserInput = exports.OrganizationInput = void 0;
const type_graphql_1 = require("type-graphql");
let OrganizationInput = class OrganizationInput {
};
exports.OrganizationInput = OrganizationInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrganizationInput.prototype, "website", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationInput.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationInput.prototype, "location", void 0);
exports.OrganizationInput = OrganizationInput = __decorate([
    (0, type_graphql_1.InputType)()
], OrganizationInput);
let UserInput = class UserInput {
};
exports.UserInput = UserInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "phone", void 0);
exports.UserInput = UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
let AddJobPostInput = class AddJobPostInput {
};
exports.AddJobPostInput = AddJobPostInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "job_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "openings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "package", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "language", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddJobPostInput.prototype, "organization_id", void 0);
exports.AddJobPostInput = AddJobPostInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddJobPostInput);
let GetAllJobPostByOrganizationInput = class GetAllJobPostByOrganizationInput {
};
exports.GetAllJobPostByOrganizationInput = GetAllJobPostByOrganizationInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllJobPostByOrganizationInput.prototype, "id", void 0);
exports.GetAllJobPostByOrganizationInput = GetAllJobPostByOrganizationInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetAllJobPostByOrganizationInput);
let UpdateJobPostInput = class UpdateJobPostInput {
};
exports.UpdateJobPostInput = UpdateJobPostInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "job_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "openings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "package", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "language", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateJobPostInput.prototype, "skills", void 0);
exports.UpdateJobPostInput = UpdateJobPostInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateJobPostInput);
let GetJobAppliedApplicationsInput = class GetJobAppliedApplicationsInput {
};
exports.GetJobAppliedApplicationsInput = GetJobAppliedApplicationsInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetJobAppliedApplicationsInput.prototype, "id", void 0);
exports.GetJobAppliedApplicationsInput = GetJobAppliedApplicationsInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetJobAppliedApplicationsInput);
let UpdatJobAppliedStatusInput = class UpdatJobAppliedStatusInput {
};
exports.UpdatJobAppliedStatusInput = UpdatJobAppliedStatusInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdatJobAppliedStatusInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdatJobAppliedStatusInput.prototype, "status", void 0);
exports.UpdatJobAppliedStatusInput = UpdatJobAppliedStatusInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdatJobAppliedStatusInput);
let OrganizationIdInput = class OrganizationIdInput {
};
exports.OrganizationIdInput = OrganizationIdInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrganizationIdInput.prototype, "id", void 0);
exports.OrganizationIdInput = OrganizationIdInput = __decorate([
    (0, type_graphql_1.InputType)()
], OrganizationIdInput);
