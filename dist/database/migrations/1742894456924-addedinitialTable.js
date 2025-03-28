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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedinitialTable1742894456924 = void 0;
class AddedinitialTable1742894456924 {
    constructor() {
        this.name = 'AddedinitialTable1742894456924';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "jobapplied" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userdetailsId" uuid, "jobpostId" uuid, CONSTRAINT "PK_860673fe3da7155d31562b2aec8" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "jobposts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "job_title" character varying NOT NULL, "category" character varying NOT NULL, "openings" character varying NOT NULL, "experience" character varying NOT NULL, "description" character varying NOT NULL, "package" character varying NOT NULL, "language" character varying NOT NULL, "skills" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "organizationId" uuid, CONSTRAINT "PK_52ee57a40ad564dc72607fb2d64" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "organizatons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "website" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "location" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userUserId" uuid, CONSTRAINT "REL_0d346d8a7cbfbd22eb351a8f1a" UNIQUE ("userUserId"), CONSTRAINT "PK_85395e52cf4fd0c7cc4fd5b25ea" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("u_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying(10) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "roleId" uuid, "userdetailsId" uuid, "organizationId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_8fdee7fca52a577869482ba984" UNIQUE ("userdetailsId"), CONSTRAINT "REL_f3d6aea8fcca58182b2e80ce97" UNIQUE ("organizationId"), CONSTRAINT "PK_ed9eff0c241ae28139f2e55d3e5" PRIMARY KEY ("u_id"))`);
            yield queryRunner.query(`CREATE TABLE "userdetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "age" integer NOT NULL, "experience" character varying NOT NULL, "skills" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userUserId" uuid, CONSTRAINT "REL_d83aae1c8d27b8607af6efa513" UNIQUE ("userUserId"), CONSTRAINT "PK_59e700dc675d54b411943929322" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "jobapplied" ADD CONSTRAINT "FK_fd6a70a3e18f9a864ff2d4958cf" FOREIGN KEY ("userdetailsId") REFERENCES "userdetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "jobapplied" ADD CONSTRAINT "FK_c84205c4ed00b2d595919c7cb99" FOREIGN KEY ("jobpostId") REFERENCES "jobposts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "jobposts" ADD CONSTRAINT "FK_863cb2f2f99aca41dbcbb6d8a1d" FOREIGN KEY ("organizationId") REFERENCES "organizatons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "organizatons" ADD CONSTRAINT "FK_0d346d8a7cbfbd22eb351a8f1ae" FOREIGN KEY ("userUserId") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8fdee7fca52a577869482ba9846" FOREIGN KEY ("userdetailsId") REFERENCES "userdetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979" FOREIGN KEY ("organizationId") REFERENCES "organizatons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "userdetails" ADD CONSTRAINT "FK_d83aae1c8d27b8607af6efa5137" FOREIGN KEY ("userUserId") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "userdetails" DROP CONSTRAINT "FK_d83aae1c8d27b8607af6efa5137"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8fdee7fca52a577869482ba9846"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
            yield queryRunner.query(`ALTER TABLE "organizatons" DROP CONSTRAINT "FK_0d346d8a7cbfbd22eb351a8f1ae"`);
            yield queryRunner.query(`ALTER TABLE "jobposts" DROP CONSTRAINT "FK_863cb2f2f99aca41dbcbb6d8a1d"`);
            yield queryRunner.query(`ALTER TABLE "jobapplied" DROP CONSTRAINT "FK_c84205c4ed00b2d595919c7cb99"`);
            yield queryRunner.query(`ALTER TABLE "jobapplied" DROP CONSTRAINT "FK_fd6a70a3e18f9a864ff2d4958cf"`);
            yield queryRunner.query(`DROP TABLE "userdetails"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "organizatons"`);
            yield queryRunner.query(`DROP TABLE "jobposts"`);
            yield queryRunner.query(`DROP TABLE "jobapplied"`);
            yield queryRunner.query(`DROP TABLE "role"`);
        });
    }
}
exports.AddedinitialTable1742894456924 = AddedinitialTable1742894456924;
