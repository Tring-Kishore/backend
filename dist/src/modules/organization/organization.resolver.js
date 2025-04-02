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
exports.OrganizationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const organization_entity_1 = require("./entity/organization.entity");
const organization_service_1 = require("./organization.service");
const input_1 = require("./input");
const input_2 = require("../user/input");
const typedi_1 = require("typedi");
const organization_response_1 = require("./organization.response");
let OrganizationResolver = class OrganizationResolver {
    constructor(organizationService = new organization_service_1.OrganizationService()) {
        this.organizationService = organizationService;
    }
    signUpOrganization(input, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Organization input:', input);
                console.log('User input:', userInput);
                const result = yield this.organizationService.signUpOrganization(input, userInput);
                console.log('Organization created:', result);
                return result;
            }
            catch (error) {
                console.error('Error in organization resolver:', error);
                throw error;
            }
        });
    }
    // adding job post
    addJobPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationService.addJobPost(input);
        });
    }
    // get job post posted by organization
    jobPosts(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationService.jobPosts(input);
        });
    }
    //Update job post
    updateJobPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationService.updateJobPost(input);
        });
    }
    //getting job apllications
    jobApplied(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationService.jobApplied(input);
        });
    }
    updateApplicationStatus(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationService.updateApplicationStatus(input);
        });
    }
    countOrganizationJobPosts(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationService.countOrganizationJobPosts(input);
        });
    }
    countOrganizationApplications(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.organizationService.countOrganizationApplications(input);
        });
    }
};
exports.OrganizationResolver = OrganizationResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => organization_entity_1.Organization),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Arg)("signUpUserInput2")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.OrganizationInput,
        input_2.UserInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "signUpOrganization", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => organization_response_1.AddJobPostResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.AddJobPostInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "addJobPost", null);
__decorate([
    (0, type_graphql_1.Query)(() => [organization_response_1.GetAllJobPostByOrganizationResponse]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.GetAllJobPostByOrganizationInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "jobPosts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => organization_response_1.UpdateJobPostResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.UpdateJobPostInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "updateJobPost", null);
__decorate([
    (0, type_graphql_1.Query)(() => [organization_response_1.GetJobAppliedApplicationsResponse]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.GetJobAppliedApplicationsInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "jobApplied", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => organization_response_1.UpdatJobAppliedStatusResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.UpdatJobAppliedStatusInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "updateApplicationStatus", null);
__decorate([
    (0, type_graphql_1.Query)(() => Number),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.OrganizationIdInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "countOrganizationJobPosts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Number),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.OrganizationIdInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "countOrganizationApplications", null);
exports.OrganizationResolver = OrganizationResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], OrganizationResolver);
