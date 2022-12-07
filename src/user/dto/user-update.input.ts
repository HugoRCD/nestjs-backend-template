import {Field, InputType, ObjectType} from "@nestjs/graphql";
import {CreateUserInput} from "./user-create.input";
import {User} from "../entities/user.entity";

@InputType()
export class UpdateUserInput extends CreateUserInput {
}

@ObjectType()
export class UpdateUserOutput {
  @Field(() => User)
    user: User;
}