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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const response_1 = require("./response");
const admin_service_1 = require("./admin.service");
const input_1 = require("./input");
let AdminResolver = class AdminResolver {
    constructor(adminService = new admin_service_1.AdminService()) {
        this.adminService = adminService;
    }
    getAllOrganizations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.getAllOrganizations();
        });
    }
    getRequestedCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.getRequestedCompanies();
        });
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.users();
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.deleteUser(id);
        });
    }
    deleteOrganization(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.deleteOrganization(input);
        });
    }
    updateOrganizationPassword(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.updateOrganizationPassword(input);
        });
    }
    updateOrganizationStatus(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.updateOrganizationStatus(input);
        });
    }
    countOrganizations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.countOrganizations();
        });
    }
    countUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.countUsers();
        });
    }
    countJobPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminService.countJobPosts();
        });
    }
};
exports.AdminResolver = AdminResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [response_1.AllApprovedOrganization], {
        description: "Getting all the approved organization"
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "getAllOrganizations", null);
__decorate([
    (0, type_graphql_1.Query)(() => [response_1.AllRequestedOrganization], {
        description: "Getting all Requested ORganization"
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "getRequestedCompanies", null);
__decorate([
    (0, type_graphql_1.Query)(() => [response_1.GetAllUser], {
        description: "Getting all users"
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_1.DeleteUserResponse),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_1.DeleteOrganizationResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.DeleteOrganizationInput]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "deleteOrganization", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_1.UpdateOrganizationPasswordResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.UpdateOrganizationPasswordInput]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "updateOrganizationPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_1.UpdateOrganizationStatusResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.UpdateOrganizationStatusInput]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "updateOrganizationStatus", null);
__decorate([
    (0, type_graphql_1.Query)(() => Number),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "countOrganizations", null);
__decorate([
    (0, type_graphql_1.Query)(() => Number),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "countUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => Number),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "countJobPosts", null);
exports.AdminResolver = AdminResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], AdminResolver);
