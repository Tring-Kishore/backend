"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AdminService = void 0;
const data_source_1 = __importDefault(require("../../database/data-source"));
const organization_entity_1 = require("../organization/entity/organization.entity");
const typedi_1 = require("typedi");
const user_entity_1 = require("../user/entity/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const jobPost_entity_1 = require("../jobs/entity/jobPost.entity");
const userDetails_entity_1 = require("../user/entity/userDetails.entity");
const jobApplied_entity_1 = require("../jobs/entity/jobApplied.entity");
const passwordGenerator_1 = require("../../../utils/passwordGenerator");
const emailSender_1 = require("../../../utils/emailSender");
let AdminService = class AdminService {
    constructor(orgRepository = data_source_1.default.getRepository(organization_entity_1.Organization), userRepository = data_source_1.default.getRepository(user_entity_1.User), jobpostRepository = data_source_1.default.getRepository(jobPost_entity_1.JobPost), userDetailsRepository = data_source_1.default.getRepository(userDetails_entity_1.UserDetails), jobAppliedRepository = data_source_1.default.getRepository(jobApplied_entity_1.JobApplied)) {
        this.orgRepository = orgRepository;
        this.userRepository = userRepository;
        this.jobpostRepository = jobpostRepository;
        this.userDetailsRepository = userDetailsRepository;
        this.jobAppliedRepository = jobAppliedRepository;
    }
    getAllOrganizations() {
        return __awaiter(this, void 0, void 0, function* () {
            const organizations = yield this.orgRepository.query(`
            SELECT o.id, o.website, o.description, o.status, o.location, o.created_at, o.updated_at, o.deleted_at, o.organization_id, o.update_password_state,u.id AS "user_id", u.name AS "user_name", u.email AS "user_email", u.phone AS "user_phone",u.role AS "user_role"
            FROM users u
            INNER JOIN organizations o ON u.id = o.organization_id
            WHERE u.role = 'organization' 
            AND u.deleted_at IS NULL 
            AND o.status = 'approved';
        `);
            return organizations.map((org) => ({
                id: org.id,
                website: org.website,
                description: org.description,
                status: org.status,
                location: org.location,
                created_at: org.created_at,
                updated_at: org.updated_at,
                deleted_at: org.deleted_at,
                organization_id: org.organization_id,
                update_password_state: org.update_password_state,
                user: {
                    id: org.user_id,
                    name: org.user_name,
                    email: org.user_email,
                    phone: org.user_phone,
                    role: org.user_role,
                },
            }));
        });
    }
    getRequestedCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            const organizations = yield this.orgRepository.query(`
            SELECT o.id, o.website, o.description, o.status, o.location, o.created_at, o.updated_at, o.deleted_at, o.organization_id, o.update_password_state,u.id AS "user_id", u.name AS "user_name", u.email AS "user_email", u.phone AS "user_phone",u.role AS "user_role"
            FROM users u
            INNER JOIN organizations o ON u.id = o.organization_id
            WHERE u.role = 'organization' 
            AND u.deleted_at IS NULL 
            AND o.status = 'pending';
        `);
            return organizations.map((org) => ({
                id: org.id,
                website: org.website,
                description: org.description,
                status: org.status,
                location: org.location,
                created_at: org.created_at,
                updated_at: org.updated_at,
                deleted_at: org.deleted_at,
                organization_id: org.organization_id,
                update_password_state: org.update_password_state,
                user: {
                    id: org.user_id,
                    name: org.user_name,
                    email: org.user_email,
                    phone: org.user_phone,
                    role: org.user_role,
                },
            }));
        });
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.query(`
            SELECT * FROM users WHERE role = 'user' AND deleted_at IS NULL
            `);
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [user] = yield this.userRepository.query(`SELECT id, name FROM users WHERE id = $1 AND deleted_at IS NULL`, [id]);
                if (!user) {
                    throw new Error('User not found or already deleted');
                }
                yield this.userRepository.query('BEGIN');
                try {
                    yield this.userRepository.query(`UPDATE users SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL`, [id]);
                    yield this.userDetailsRepository.query(`UPDATE userdetails SET deleted_at = NOW() WHERE user_id = $1 AND deleted_at IS NULL`, [id]);
                    yield this.jobAppliedRepository.query(`UPDATE jobapplied SET deleted_at = NOW() WHERE user_id = $1 AND deleted_at IS NULL`, [id]);
                    yield this.userRepository.query('COMMIT');
                    return { id: user.id, name: user.name };
                }
                catch (error) {
                    yield this.userRepository.query('ROLLBACK');
                    throw new Error('Failed to delete user');
                }
            }
            catch (error) {
                if (error.message === 'User not found or already deleted') {
                    throw error;
                }
                throw new Error('Failed to delete user');
            }
        });
    }
    deleteOrganization(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [organization] = yield this.orgRepository.query(`SELECT organization_id FROM organizations WHERE id = $1 AND deleted_at IS NULL`, [input.id]);
            yield this.orgRepository.query(`UPDATE organizations SET deleted_at = NOW() WHERE id = $1 AND deleted_At IS NULL`, [input.id]);
            console.log('deleting for organization', organization.organization_id);
            yield this.userRepository.query(`UPDATE users SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL`, [organization.organization_id]);
            yield this.jobpostRepository.query(`UPDATE jobposts SET deleted_at = NOW() WHERE organization_id = $1 AND deleted_at IS NULL`, [organization.organization_id]);
            yield this.jobAppliedRepository.query(`UPDATE jobapplied SET deleted_at = NOW() WHERE organization_id = $1 AND deleted_at IS NULL`, [organization.organization_id]);
            return { id: input.id };
        });
    }
    updateOrganizationPassword(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // const organization = await this.orgRepository.findOne({
            //   where: { id: input.id },
            // });
            // console.log("it is taking the id ", input.id);
            const hashedPassword = yield bcrypt.hash(input.password, 10);
            // update password in user table
            yield this.userRepository.query(`
            UPDATE users SET password = $1 WHERE id = $2 AND deleted_at IS NULL
            `, [hashedPassword, input.id]);
            // update password state
            yield this.orgRepository.query(`
            UPDATE organizations SET update_password_state = true WHERE organization_id = $1 AND deleted_at IS NULL
            `, [input.id]);
            console.log("the password is ", input.password);
            return {
                update_password_state: true,
            };
        });
    }
    updateOrganizationStatus(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [organization] = yield this.orgRepository.query(`SELECT id, organization_id FROM organizations WHERE id = $1`, [input.id]);
            const [orgId] = yield this.orgRepository.query(`SELECT organization_id FROM organizations WHERE id = $1`, [input.id]);
            const [user] = yield this.userRepository.query(`SELECT email FROM users WHERE id = $1 AND deleted_at IS NULL`, [orgId.organization_id]);
            yield this.orgRepository.query(`
        UPDATE organizations SET status = $1 WHERE id = $2
        `, [input.status, input.id]);
            if (input.status === 'approved' || input.status === 'rejected') {
                let emailSubject = `Application Status Updated: ${input.status}`;
                let emailText = '';
                if (input.status === 'approved') {
                    const defaultPassword = (0, passwordGenerator_1.generatePassword)();
                    const hashedPassword = yield bcrypt.hash(defaultPassword, 10);
                    yield this.userRepository.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, orgId.organization_id]);
                    emailText = `Your organization has been approved. 
            The default password is ${defaultPassword}. After logging in, you can change the password.`;
                }
                else if (input.status === 'rejected') {
                    emailText = `Your application has been rejected.`;
                }
                yield (0, emailSender_1.sendEmail)({
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: emailSubject,
                    text: emailText,
                });
            }
            return { id: input.id, status: input.status };
        });
    }
    countOrganizations() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.query(`SELECT COUNT(id) FROM users WHERE role = 'organization' AND deleted_at IS NULL`);
            const count = parseInt(result[0].count);
            console.log('The organization count is', count);
            return count;
        });
    }
    countUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.query(`SELECT COUNT(id) FROM users WHERE role = 'user' AND deleted_at IS NULL`);
            const count = parseInt(result[0].count);
            return count;
        });
    }
    countJobPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.jobpostRepository.query(`SELECT COUNT(id) FROM jobposts WHERE deleted_at IS NULL`);
            const count = parseInt(result[0].count);
            return count;
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AdminService);
