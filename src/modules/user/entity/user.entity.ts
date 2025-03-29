import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserDetails } from "./userDetails.entity";
import { Organization } from "../../organization/entity/organization.entity";
import { JobPost } from "../../jobs/entity/jobPost.entity";
import { JobApplied } from "../../jobs/entity/jobApplied.entity";

@Entity({ name: "users" })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column({ length: 10 })
  @Field()
  phone!: string;

  @Column()
  password!: string; // No @Field - don't expose in GraphQL

  @Column({ length: 50 })
  @Field()
  role!: string;

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  @Field({ nullable: true })
  deleted_at?: Date;

  // Relations
  @OneToOne(() => UserDetails, details => details.user)
  @Field(() => UserDetails, { nullable: true })
  details?: string;

  @OneToOne(() => Organization, organization => organization.user)
  @Field(() => [Organization], { nullable: true })
  organizations?: Organization[];

  @OneToMany(() => JobPost, jobPost => jobPost.organization)
  @Field(() => [JobPost], { nullable: true })
  jobPosts?: JobPost[];

  @OneToMany(() => JobApplied, application => application.user)
  @Field(() => [JobApplied], { nullable: true })
  jobApplications?: JobApplied[];
}