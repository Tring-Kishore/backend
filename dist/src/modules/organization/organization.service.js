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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const organization_entity_1 = require("./entity/organization.entity");
const user_entity_1 = require("../user/entity/user.entity");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = __importDefault(require("../../database/data-source"));
const typedi_1 = require("typedi");
const jobPost_entity_1 = require("../jobs/entity/jobPost.entity");
const jobApplied_entity_1 = require("../jobs/entity/jobApplied.entity");
const passwordGenerator_1 = require("../../../utils/passwordGenerator");
const emailSender_1 = require("../../../utils/emailSender");
let OrganizationService = class OrganizationService {
    constructor(userRepository = data_source_1.default.getRepository(user_entity_1.User), orgRepository = data_source_1.default.getRepository(organization_entity_1.Organization), jobPostRepository = data_source_1.default.getRepository(jobPost_entity_1.JobPost), jobAppliedRepository = data_source_1.default.getRepository(jobApplied_entity_1.JobApplied)) {
        this.userRepository = userRepository;
        this.orgRepository = orgRepository;
        this.jobPostRepository = jobPostRepository;
        this.jobAppliedRepository = jobAppliedRepository;
    }
    signUpOrganization(input, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('came to service');
                const { website, status = "pending", description = "", location = "" } = input;
                const { name, email, phone } = userInput;
                const normalizedEmail = email.toLowerCase();
                const userId = (0, uuid_1.v4)();
                const orgId = (0, uuid_1.v4)();
                const existingUser = yield this.userRepository.findOne({
                    where: { email: normalizedEmail }
                });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                // Create user
                const defaultPassword = (0, passwordGenerator_1.generatePassword)();
                const hashedPassword = yield bcrypt_1.default.hash(defaultPassword, 10);
                const user = new user_entity_1.User();
                user.id = userId;
                user.name = name;
                user.email = normalizedEmail;
                user.phone = phone;
                user.password = hashedPassword;
                user.role = user_entity_1.UserRole.ORGANIZATION;
                const savedUser = yield this.userRepository.save(user);
                // Create organization
                const organization = new organization_entity_1.Organization();
                organization.id = orgId;
                organization.user = { id: userId };
                organization.website = website;
                organization.description = description;
                organization.status = status;
                organization.location = location;
                const savedOrganization = yield this.orgRepository.save(organization);
                yield (0, emailSender_1.sendEmail)({
                    from: process.env.EMAIL,
                    to: normalizedEmail,
                    subject: 'Wait until admin approve',
                    text: 'Welcome to Job Found, You have signed up, wait until admin accepts',
                });
                console.log('Organization created successfully:', savedOrganization);
                return savedOrganization;
            }
            catch (error) {
                console.error("Error in signUpOrganization service:", error);
                throw error;
            }
        });
    }
    addJobPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const [result] = yield this.jobPostRepository.query(`INSERT INTO jobposts (
          id, job_title, category, openings, experience, description, package, language, skills, organization_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`, [
                id, input.job_title, input.category, input.openings, input.experience, input.description, input.package, input.language, input.skills, input.organization_id,
            ]);
            return result;
        });
    }
    jobPosts(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = this.jobPostRepository.query(`SELECT id, job_title, category, openings, experience, description, package, language, skills, organization_id FROM jobposts WHERE organization_id = $1`, [input.id]);
            console.log('the posts are ', posts);
            return posts;
        });
    }
    updateJobPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.jobPostRepository.query(`UPDATE jobposts SET job_title = $1, category = $2, openings = $3, experience = $4, description = $5, package = $6, language = $7, skills = $8 WHERE id = $9
       RETURNING *`, [input.job_title, input.category, input.openings, input.experience, input.description, input.package, input.language, input.skills, input.id]);
            const updatePost = yield this.jobPostRepository.findOne({ where: { id: input.id }, select: ['id', 'job_title', 'category', 'openings', 'experience', 'description', 'package', 'language', 'skills'] });
            return updatePost;
        });
    }
    jobApplied(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.jobAppliedRepository.query(`SELECT 
        ja.id, ja.jobpost_id, ja.organization_id, ja.user_id, ja.status, ja.created_at, ja.updated_at,
        u.name, u.email,
        jp.job_title, jp.category, jp.openings, jp.skills,
        org.name AS company
       FROM jobapplied ja
       JOIN users u ON ja.user_id = u.id
       JOIN jobposts jp ON ja.jobpost_id = jp.id
       JOIN users org ON ja.organization_id = org.id
       WHERE ja.organization_id = $1 AND ja.deleted_at IS NULL`, [input.id]);
            return result;
        });
    }
    updateApplicationStatus(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.jobAppliedRepository.query(
            //   `UPDATE jobapplied
            //    SET status = $1, updated_at = NOW()
            //    WHERE id = $2
            //    RETURNING *`,
            //   [input.status, input.id]
            // );
            yield this.jobAppliedRepository.update({ id: input.id }, { status: input.status, updated_at: new Date() });
            const updatedJobApplied = yield this.jobAppliedRepository.findOne({ where: { id: input.id }, select: ['id', 'status'] });
            return { id: input.id, status: input.status };
        });
    }
    countOrganizationJobPosts(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.jobPostRepository.query(`SELECT COUNT(id) FROM jobposts WHERE organization_id = $1 AND deleted_at IS NULL`, [input.id]);
            const count = parseInt(result[0].count);
            return count;
        });
    }
    countOrganizationApplications(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.jobAppliedRepository.query(`SELECT COUNT(id) FROM jobapplied WHERE organization_id = $1 AND deleted_at IS NULL`, [input.id]);
            return parseInt(result[0].count);
        });
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], OrganizationService);
