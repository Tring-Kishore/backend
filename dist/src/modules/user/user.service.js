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
exports.UserService = void 0;
const user_entity_1 = require("./entity/user.entity");
const userDetails_entity_1 = require("./entity/userDetails.entity");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const typedi_1 = require("typedi");
const data_source_1 = __importDefault(require("../../database/data-source"));
const organization_entity_1 = require("../organization/entity/organization.entity");
const jwt = __importStar(require("jsonwebtoken"));
const jobPost_entity_1 = require("../jobs/entity/jobPost.entity");
const jobApplied_entity_1 = require("../jobs/entity/jobApplied.entity");
let UserService = class UserService {
    constructor(userRepository = data_source_1.default.getRepository(user_entity_1.User), userDetailsRepository = data_source_1.default.getRepository(userDetails_entity_1.UserDetails), orgRepository = data_source_1.default.getRepository(organization_entity_1.Organization), jobPostRepository = data_source_1.default.getRepository(jobPost_entity_1.JobPost), jobAppliedRepository = data_source_1.default.getRepository(jobApplied_entity_1.JobApplied)) {
        this.userRepository = userRepository;
        this.userDetailsRepository = userDetailsRepository;
        this.orgRepository = orgRepository;
        this.jobPostRepository = jobPostRepository;
        this.jobAppliedRepository = jobAppliedRepository;
    }
    signUpUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service received input:", input);
                const { name, email, phone, password } = input;
                const normalizedEmail = email.toLowerCase();
                const existingUser = yield this.userRepository.findOne({
                    where: { email: normalizedEmail },
                });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const hashedPassword = yield bcrypt.hash(password, 10);
                const userId = (0, uuid_1.v4)();
                const savedUser = yield this.userRepository.save({ id: userId,
                    name: name,
                    email: normalizedEmail,
                    phone: phone,
                    password: hashedPassword,
                    role: user_entity_1.UserRole.USER });
                console.log('the saved user ', savedUser);
                yield this.userDetailsRepository.save({
                    id: (0, uuid_1.v4)(),
                    userId: savedUser.id,
                    age: 18,
                    experience: "",
                    skills: "",
                    description: "",
                });
                console.log("User created successfully:", savedUser);
                return savedUser;
            }
            catch (error) {
                console.error("Signup error:", error);
                throw error;
            }
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = input;
                console.log('the service in the login', input);
                const normalizedEmail = email.toLowerCase();
                const [user] = yield this.userRepository.query(`SELECT id, name, email, password, role FROM users WHERE email = $1 AND deleted_at IS NULL`, [normalizedEmail]);
                if (!user) {
                    throw new Error('User Not found');
                }
                const isValidPassword = yield bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error('Invalid Password');
                }
                let updatePasswordState = false;
                if (user.role === 'organization') {
                    const [organization] = yield this.orgRepository.query(`SELECT update_password_state FROM organizations WHERE organization_id = $1 AND deleted_at IS NULL`, [user.id]);
                    if (organization) {
                        updatePasswordState = organization.update_password_state;
                    }
                }
                if (!process.env.JWT_SECRET) {
                    throw new Error('JWT secret not configured');
                }
                const token = jwt.sign({
                    userId: user.id,
                    name: user.name,
                    role: user.role,
                    update_password_state: updatePasswordState
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log('the token datas ', user.id, " ", user.name, " ", user.role, " ", updatePasswordState);
                console.log('the service of token ', token);
                return { token: token };
            }
            catch (error) {
                console.error('Login Error', error);
                throw error;
            }
        });
    }
    allJobPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.jobPostRepository.query(`
      SELECT j.id , j.job_title , j.category , j.openings , j.experience , j.description , j.package , j.language , j.skills ,j.organization_id, u.name AS organization_name 
           FROM jobposts j
           JOIN users u ON j.organization_id = u.id 
           WHERE j.deleted_at IS NULL
      `);
            console.log('the post are', posts);
            return posts;
        });
    }
    //applying for job
    applyForJob(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [existingApplication] = yield this.jobAppliedRepository.query(`SELECT * FROM jobapplied 
             WHERE jobpost_id = $1 AND user_id = $2 AND deleted_at IS NULL`, [input.jobpost_id, input.user_id]);
                if (existingApplication) {
                    throw new Error('You have already applied for this job');
                }
                const [checking] = yield this.userDetailsRepository.query(`
            SELECT age, experience, skills, description FROM userdetails WHERE user_id = $1
        `, [input.user_id]);
                if (!checking || checking.age === null || checking.experience === null ||
                    !checking.skills || !checking.description) {
                    throw new Error('Please complete your profile before applying for a job');
                }
                const id = (0, uuid_1.v4)();
                const [result] = yield this.jobAppliedRepository.query(`INSERT INTO jobapplied (
                id, jobpost_id, user_id, organization_id, status
            ) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [id, input.jobpost_id, input.user_id, input.organization_id, 'applied']);
                return result;
            }
            catch (error) {
                if (error.message === 'You have already applied for this job' ||
                    error.message === 'Please complete your profile before applying for a job') {
                    throw error;
                }
                throw new Error('Failed to apply for job');
            }
        });
    }
    //getting user applie jobs
    getUserJobApplied(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.jobAppliedRepository.query(`SELECT 
        ja.id, ja.jobpost_id, ja.organization_id, ja.user_id, ja.status,ja.created_at, ja.updated_at,
        u.name, u.email,
        jp.job_title, jp.category, jp.openings, jp.skills,
        org.name AS company
       FROM jobapplied ja
       JOIN users u ON ja.user_id = u.id
       JOIN jobposts jp ON ja.jobpost_id = jp.id
       JOIN users org ON ja.organization_id = org.id
       WHERE ja.user_id = $1 AND ja.deleted_at IS NULL`, [input.id]);
            return result;
        });
    }
    countUserApplications(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.query(`SELECT COUNT(id) FROM jobapplied WHERE user_id = $1 AND deleted_at IS NULL`, [input.id]);
            const count = parseInt(result[0].count);
            return count;
        });
    }
    user(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.query(`
      SELECT u.id , u.name ,u.email , u.phone , ud.age , ud.experience , ud.skills , ud.description FROM users u
INNER JOIN userdetails ud ON u.id = ud.user_id
WHERE u.id = $1
      `, [input.id]);
            console.log('the user details ', result[0]);
            return result[0];
        });
    }
    updateUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.query(`UPDATE users
       SET name = $1, email = $2, phone = $3, updated_at = NOW()
       WHERE id = $4`, [input.name, input.email, input.phone, input.id]);
            yield this.userDetailsRepository.query(`UPDATE userdetails
       SET age = $1, experience = $2, skills = $3, description = $4, updated_at = NOW()
       WHERE user_id = $5`, [input.age, input.experience, input.skills, input.description, input.id]);
            const result = yield this.userRepository.query(`
      SELECT u.id , u.name ,u.email , u.phone , ud.age , ud.experience , ud.skills , ud.description FROM users u
INNER JOIN userdetails ud ON u.id = ud.user_id
WHERE u.id = $1
      `, [input.id]);
            console.log('the user details ', result[0]);
            return result[0];
        });
    }
    //withdraw application 
    withdrawApplication(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.jobAppliedRepository.query(`
      UPDATE jobapplied SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL 
      `, [input.id]);
            const withdraw = yield this.jobAppliedRepository.query(`
      SELECT id FROM jobapplied WHERE id = $1
      `, [input.id]);
            return withdraw[0];
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], UserService);
