import {InputType, Int, Field, ObjectType} from '@nestjs/graphql';
import {IsAlpha} from "class-validator";
import {Column} from "typeorm";
import {Role} from "../entities/role.entity";

@InputType()
export class CreateRoleInput {
    @IsAlpha()
    @Field(() => String)
    @Column({unique: true})
    name: string;

    @Field(() => String)
    @Column({nullable: true})
    description: string;
}

@ObjectType()
export class CreateRoleOutput {
    @Field(() => Role)
    role: Role;
}