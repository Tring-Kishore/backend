"use strict";
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
const data_source_1 = __importDefault(require("../../database/data-source"));
const user_entity_1 = require("../user/entity/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.userRepo = data_source_1.default.getRepository(user_entity_1.User);
    }
    signUpUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Input Data:', input);
                const { name, email, phone, password, role } = input;
                const normalizedEmail = email.toLowerCase();
                const id = (0, uuid_1.v4)();
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                console.log('Hashed Password:', hashedPassword);
                const userExists = yield this.userRepo.query('SELECT * FROM users WHERE LOWER(email) = $1 AND deleted_at IS NULL', [normalizedEmail]);
                console.log('User Exists:', userExists.rows);
                if (userExists.rows.length > 0) {
                    throw new Error('User already exists');
                }
                const newUser = yield this.userRepo.query('INSERT INTO users (id, name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id, name, normalizedEmail, phone, hashedPassword, role]);
                console.log('New User:', newUser.rows[0]);
                const id2 = (0, uuid_1.v4)();
                const userDetailsInsert = yield this.userRepo.query(`INSERT INTO userdetails (id, user_id,age,experience,skills,description)
               VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [id2, id, 18, "-", "-", "-"]);
                console.log('User Details Insert:', userDetailsInsert.rows[0]);
                return newUser.rows[0];
            }
            catch (error) {
                console.error('Error in signUpUser resolver:', error);
                throw new Error('Failed to sign up user: ' + error.message);
            }
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const normalizedEmail = email.toLowerCase();
            const user = yield this.userRepo.findOneBy({ email: normalizedEmail });
            if (!user) {
                throw new Error("User not found");
            }
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error("Invalid password");
            }
            let updatePasswordState = null;
            if (user.role.name === "organization") {
                const organizationRepo = data_source_1.default.getRepository("Organization");
                const organization = yield organizationRepo.findOneBy({ organization_id: user.id });
                if (organization) {
                    updatePasswordState = organization.update_password_state;
                }
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                name: user.name,
                role: user.role,
                update_password_state: updatePasswordState,
            }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return { token };
        });
    }
    getRoleIdByRole(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleRepo.findOneBy({ name: roleName });
            return role.id;
        });
    }
}
exports.UserService = UserService;
