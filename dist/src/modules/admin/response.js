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
exports.UpdateOrganizationStatusResponse = exports.UpdateOrganizationPasswordResponse = exports.DeleteOrganizationResponse = exports.DeleteUserResponse = exports.AllRequestedOrganization = exports.AllApprovedOrganization = exports.GetAllUser = void 0;
const type_graphql_1 = require("type-graphql");
let GetAllUser = class GetAllUser {
};
exports.GetAllUser = GetAllUser;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllUser.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllUser.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllUser.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllUser.prototype, "role", void 0);
exports.GetAllUser = GetAllUser = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetAllUser);
let AdminOganizationUser = class AdminOganizationUser {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminOganizationUser.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminOganizationUser.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminOganizationUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminOganizationUser.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminOganizationUser.prototype, "role", void 0);
AdminOganizationUser = __decorate([
    (0, type_graphql_1.ObjectType)()
], AdminOganizationUser);
let AllApprovedOrganization = class AllApprovedOrganization {
};
exports.AllApprovedOrganization = AllApprovedOrganization;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllApprovedOrganization.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllApprovedOrganization.prototype, "website", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllApprovedOrganization.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllApprovedOrganization.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllApprovedOrganization.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AllApprovedOrganization.prototype, "created_at", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], AllApprovedOrganization.prototype, "updated_at", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], AllApprovedOrganization.prototype, "deleted_at", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllApprovedOrganization.prototype, "organization_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], AllApprovedOrganization.prototype, "update_password_state", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => AdminOganizationUser),
    __metadata("design:type", AdminOganizationUser)
], AllApprovedOrganization.prototype, "user", void 0);
exports.AllApprovedOrganization = AllApprovedOrganization = __decorate([
    (0, type_graphql_1.ObjectType)()
], AllApprovedOrganization);
let AllRequestedOrganization = class AllRequestedOrganization {
};
exports.AllRequestedOrganization = AllRequestedOrganization;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllRequestedOrganization.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllRequestedOrganization.prototype, "website", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllRequestedOrganization.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllRequestedOrganization.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllRequestedOrganization.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AllRequestedOrganization.prototype, "created_at", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], AllRequestedOrganization.prototype, "updated_at", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], AllRequestedOrganization.prototype, "deleted_at", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AllRequestedOrganization.prototype, "organization_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], AllRequestedOrganization.prototype, "update_password_state", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => AdminOganizationUser),
    __metadata("design:type", AdminOganizationUser)
], AllRequestedOrganization.prototype, "user", void 0);
exports.AllRequestedOrganization = AllRequestedOrganization = __decorate([
    (0, type_graphql_1.ObjectType)()
], AllRequestedOrganization);
let DeleteUserResponse = class DeleteUserResponse {
};
exports.DeleteUserResponse = DeleteUserResponse;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], DeleteUserResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteUserResponse.prototype, "name", void 0);
exports.DeleteUserResponse = DeleteUserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteUserResponse);
let DeleteOrganizationUserDetilts = class DeleteOrganizationUserDetilts {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteOrganizationUserDetilts.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteOrganizationUserDetilts.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteOrganizationUserDetilts.prototype, "email", void 0);
DeleteOrganizationUserDetilts = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteOrganizationUserDetilts);
let DeleteOrganizationResponse = class DeleteOrganizationResponse {
};
exports.DeleteOrganizationResponse = DeleteOrganizationResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteOrganizationResponse.prototype, "id", void 0);
exports.DeleteOrganizationResponse = DeleteOrganizationResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteOrganizationResponse);
let UpdateOrganizationPasswordResponse = class UpdateOrganizationPasswordResponse {
};
exports.UpdateOrganizationPasswordResponse = UpdateOrganizationPasswordResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UpdateOrganizationPasswordResponse.prototype, "update_password_state", void 0);
exports.UpdateOrganizationPasswordResponse = UpdateOrganizationPasswordResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UpdateOrganizationPasswordResponse);
let UpdateOrganizationStatusResponse = class UpdateOrganizationStatusResponse {
};
exports.UpdateOrganizationStatusResponse = UpdateOrganizationStatusResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateOrganizationStatusResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateOrganizationStatusResponse.prototype, "status", void 0);
exports.UpdateOrganizationStatusResponse = UpdateOrganizationStatusResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UpdateOrganizationStatusResponse);
