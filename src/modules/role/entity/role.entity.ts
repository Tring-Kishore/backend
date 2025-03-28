import { User } from "../../user/entity/user.entity";
import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"role"})
@ObjectType()
export class Role{
    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    @Field()
    name!:string

    @Column()
    @Field()
    @CreateDateColumn()
    created_at!: Date

    @Column()
    @Field()
    @UpdateDateColumn()
    updated_at!: Date

    @Column()
    @Field()
    @DeleteDateColumn()
    deleted_at?:Date

    @OneToMany(() => User, (user) => user.role)
    user!: User[]
}