"use strict";
// import dataSource from "../../database/data-source";
// import { User } from "../user/entity/user.entity";
// import { Repository } from "typeorm";
// import { userInput } from "./input";
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";
// export class OrganizationService{
//     private readonly userRepo: Repository<User>;
//     constructor() {
//         this.userRepo = dataSource.getRepository(User);
//     }
// }    
// signUpOrganization: async (_, {userInput }) => {
//     try {
//       const { website, status, description, location } = userInput;
//       const { name, email, phone } = signUpUserInput2;
//       console.log('Organization details:', input);
//       console.log('User details:', signUpUserInput2);
//       const normalizedEmail = email.toLowerCase();
//       const userId = uuidv4();
//       const orgId = uuidv4();
//       const userExists = await this.organizationRepo.query(
//         'SELECT * FROM users WHERE LOWER(email) = $1 AND deleted_at IS NULL',
//         [normalizedEmail]
//       );
//       if (userExists.rows.length > 0) {
//         throw new Error('User already exists');
//       }
//       const defaultPassword = generatePassword();
//       const hashedPassword = await bcrypt.hash(defaultPassword, 10);
//       const newUser = await pool.query(
//         'INSERT INTO users (id, name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//         [userId, name, normalizedEmail, phone, hashedPassword, 'organization']
//       );
//       const newOrg = await pool.query(
//         'INSERT INTO organizations (id, organization_id, website, description, status, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//         [orgId, userId, website, description, status, location]
//       );
//       await sendEmail({
//         from: process.env.EMAIL,
//         to: normalizedEmail,
//         subject: 'Wait until admin approve',
//         text: 'Welcome to Job Found, You have signed up, wait until admin accepts',
//       });
//       return newOrg.rows[0];
//     } catch (error) {
//       console.error('Error in signUpOrganization resolver:', error);
//       throw new Error('Failed to sign up organization');
//     }
//   },
