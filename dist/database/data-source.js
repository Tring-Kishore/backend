"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbdataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.dbdataSource = {
    type: 'postgres',
    database: process.env.DB_NAME || 'jobportal-backend',
    entities: ['src/**/*.entity.{js,ts}'],
    // entities: [User]
    migrations: ['src/database/migrations/*.{js,ts}'],
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    synchronize: false,
    logging: true,
};
const dataSource = new typeorm_1.DataSource(exports.dbdataSource);
exports.default = dataSource;
