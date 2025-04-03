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
exports.DirectUploadInput = exports.GetDownloadSignedUrlInput = exports.GetUploadSignedUrlInput = exports.WithdrawApplicationInput = exports.UpdateUserInput = exports.UserIdInput = exports.JobAppliedByUserInput = exports.JobApplyInput = exports.LoginInput = exports.UserInput = void 0;
const type_graphql_1 = require("type-graphql");
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
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "role", void 0);
exports.UserInput = UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
let LoginInput = class LoginInput {
};
exports.LoginInput = LoginInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
exports.LoginInput = LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
let JobApplyInput = class JobApplyInput {
};
exports.JobApplyInput = JobApplyInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplyInput.prototype, "jobpost_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplyInput.prototype, "user_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobApplyInput.prototype, "organization_id", void 0);
exports.JobApplyInput = JobApplyInput = __decorate([
    (0, type_graphql_1.InputType)()
], JobApplyInput);
let JobAppliedByUserInput = class JobAppliedByUserInput {
};
exports.JobAppliedByUserInput = JobAppliedByUserInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], JobAppliedByUserInput.prototype, "id", void 0);
exports.JobAppliedByUserInput = JobAppliedByUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], JobAppliedByUserInput);
let UserIdInput = class UserIdInput {
};
exports.UserIdInput = UserIdInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserIdInput.prototype, "id", void 0);
exports.UserIdInput = UserIdInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserIdInput);
let UpdateUserInput = class UpdateUserInput {
};
exports.UpdateUserInput = UpdateUserInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "age", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "description", void 0);
exports.UpdateUserInput = UpdateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateUserInput);
let WithdrawApplicationInput = class WithdrawApplicationInput {
};
exports.WithdrawApplicationInput = WithdrawApplicationInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WithdrawApplicationInput.prototype, "id", void 0);
exports.WithdrawApplicationInput = WithdrawApplicationInput = __decorate([
    (0, type_graphql_1.InputType)()
], WithdrawApplicationInput);
let GetUploadSignedUrlInput = class GetUploadSignedUrlInput {
};
exports.GetUploadSignedUrlInput = GetUploadSignedUrlInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUploadSignedUrlInput.prototype, "fileName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetUploadSignedUrlInput.prototype, "folder", void 0);
exports.GetUploadSignedUrlInput = GetUploadSignedUrlInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetUploadSignedUrlInput);
let GetDownloadSignedUrlInput = class GetDownloadSignedUrlInput {
};
exports.GetDownloadSignedUrlInput = GetDownloadSignedUrlInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetDownloadSignedUrlInput.prototype, "fileKey", void 0);
exports.GetDownloadSignedUrlInput = GetDownloadSignedUrlInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetDownloadSignedUrlInput);
let DirectUploadInput = class DirectUploadInput {
};
exports.DirectUploadInput = DirectUploadInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DirectUploadInput.prototype, "file", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DirectUploadInput.prototype, "fileName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DirectUploadInput.prototype, "folder", void 0);
exports.DirectUploadInput = DirectUploadInput = __decorate([
    (0, type_graphql_1.InputType)()
], DirectUploadInput);
