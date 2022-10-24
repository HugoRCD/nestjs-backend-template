import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {Role} from '../models/Role.model';

@InputType()
export class RoleCreateInput {
    @Field(() => String)
    name: string;

    @Field(() => String, {nullable: true})
    description?: string;
}

@ObjectType()
export class RoleCreateOutput {
    @Field(() => Role)
    role: Role;
}
