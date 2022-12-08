import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Role} from "../../auth/decorators/role.enum";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, {description: "Primary Key"})
    id: number;

  @Field(() => String, {description: "Username"})
  @Column({unique: true})
    username: string;

  @Field(() => String, {description: "Firstname"})
  @Column()
    firstname: string;

  @Field(() => String, {description: "Lastname"})
  @Column()
    lastname: string;

  @Field(() => Date, {description: "Birthdate"})
  @Column()
    birthdate: Date;

  @Field(() => String, {description: "Email"})
  @Column({unique: true})
    email: string;

  @Field(() => String, {description: "Phone number"})
  @Column()
    phone: string;

  @Column()
    password: string;

  @Field(() => Int, {description: "Role", defaultValue: Role.USER})
  @Column({default: Role.USER})
    role: number;

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
    avatar?: string;

  @Field(() => Boolean, {description: "Is email verified", defaultValue: false})
  @Column({default: false})
    isVerified: boolean;

  @Field(() => String, {description: "JWT token"})
  @Column({nullable: true, length: 600})
    token: string;

  @Field(() => Date, {description: "Creation date"})
  @CreateDateColumn()
    createdAt: Date;

  @Field(() => Date, {description: "Last update date"})
  @UpdateDateColumn()
    updatedAt: Date;
}
