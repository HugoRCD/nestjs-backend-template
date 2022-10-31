import { InputType, ObjectType } from '@nestjs/graphql';
import { CreateUserInput, CreateUserOutput } from './user-create.input';

@InputType()
export class UpdateUserInput extends CreateUserInput {}

@ObjectType()
export class UpdateUserOutput extends CreateUserOutput {}