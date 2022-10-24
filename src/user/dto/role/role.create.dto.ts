import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {Column} from "typeorm";
import {Role} from "../../models/role.model";

@InputType()
export class RoleCreateInput {
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
