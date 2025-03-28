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
exports.UserDetails = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const jobApplied_entity_1 = require("../../jobs/entity/jobApplied.entity");
let UserDetails = class UserDetails {
};
exports.UserDetails = UserDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetails.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserDetails.prototype, "age", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserDetails.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserDetails.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date
    //one to one relationship to userdetails
    )
], UserDetails.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.userdetails),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User
    // one user to many job apply
    )
], UserDetails.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobApplied_entity_1.JobApplied, (jobapplied) => jobapplied.userdetails),
    __metadata("design:type", Array)
], UserDetails.prototype, "jobapplied", void 0);
exports.UserDetails = UserDetails = __decorate([
    (0, typeorm_1.Entity)({ name: "userdetails" }),
    (0, type_graphql_1.ObjectType)()
], UserDetails);
