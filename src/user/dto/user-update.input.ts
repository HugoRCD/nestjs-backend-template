import {InputType} from "@nestjs/graphql";
import {CreateUserInput} from "./user-create.input";

@InputType()
export class UpdateUserInput extends CreateUserInput {
}