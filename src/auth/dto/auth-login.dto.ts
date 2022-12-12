import {Field, ObjectType} from "@nestjs/graphql";
import {User} from "../../user/entities/user.entity";

@ObjectType()
export class AuthLoginOutput {
  @Field(() => String)
    accessToken: string;

  @Field(() => String)
    refreshToken: string;

  @Field(() => User)
    user: User;
}
