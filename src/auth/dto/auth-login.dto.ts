import { Field, ObjectType } from '@nestjs/graphql';
import {User} from "../../user/entities/user.entity";

@ObjectType()
export class AuthLoginOutput {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
