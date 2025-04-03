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
let UserDetails = class UserDetails {
};
exports.UserDetails = UserDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UserDetails.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserDetails.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserDetails.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserDetails.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserDetails.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], UserDetails.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], UserDetails.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deleted_at", nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UserDetails.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.details),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", String)
], UserDetails.prototype, "userId", void 0);
exports.UserDetails = UserDetails = __decorate([
    (0, typeorm_1.Entity)({ name: "userdetails" }),
    (0, type_graphql_1.ObjectType)()
], UserDetails);
