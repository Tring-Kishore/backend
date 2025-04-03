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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_entity_1 = require("./entity/user.entity");
const user_service_1 = require("./user.service");
const input_1 = require("./input");
const typedi_1 = require("typedi");
const response_1 = require("./response");
const aws_sdk_1 = require("aws-sdk");
console.log("the resolver of user");
let UserResolver = class UserResolver {
    constructor(userService = new user_service_1.UserService(), s3 = new aws_sdk_1.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    })) {
        this.userService = userService;
        this.s3 = s3;
    }
    signUpUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("the input in resolver", input);
            // console.log("the resolver", this.userService);
            // console.log('the output is ',this.userService.signUpUser(input));
            return this.userService.signUpUser(input);
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("the login input", input);
            const token = yield this.userService.login(input);
            console.log("the token in resolver", token);
            return token;
        });
    }
    allJobPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.allJobPosts();
        });
    }
    applyForJob(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.applyForJob(input);
        });
    }
    getUserJobApplied(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getUserJobApplied(input);
        });
    }
    countUserApplications(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.countUserApplications(input);
        });
    }
    user(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.user(input);
        });
    }
    updateUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.updateUser(input);
        });
    }
    withdrawApplication(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.withdrawApplication(input);
        });
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signUpUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_1.LoginResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Query)(() => [response_1.JobPostResponse]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "allJobPosts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_1.JobApplyResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.JobApplyInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "applyForJob", null);
__decorate([
    (0, type_graphql_1.Query)(() => [response_1.JobAppliedByUserResponse]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.JobAppliedByUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserJobApplied", null);
__decorate([
    (0, type_graphql_1.Query)(() => Number),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.UserIdInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "countUserApplications", null);
__decorate([
    (0, type_graphql_1.Query)(() => response_1.UserDetailsResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.UserIdInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_1.UserDetailsResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_1.WithdrawApplicationResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.WithdrawApplicationInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "withdrawApplication", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object, Object])
], UserResolver);
