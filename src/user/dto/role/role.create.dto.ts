import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {Column} from "typeorm";
import {Role} from "../../models/role.model";
import {IsAlpha} from "class-validator";

@InputType()
export class RoleCreateInput {
    @IsAlpha()
    @Field(() => String)
    @Column({unique: true})
    name: string;

    @Field(() => String)
    @Column({nullable: true})
    description: string;
}

@ObjectType()
export class RoleCreateOutput {
    @Field(() => Role)
    role: Role;
}
