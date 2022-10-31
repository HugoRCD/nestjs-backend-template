import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class DeleteUserOutput {
    @Field(() => ID)
    userId: User['id']; //TODO: Add message
}