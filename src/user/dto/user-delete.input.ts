import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class DeleteUserOutput {
  @Field(() => String)
    message: string;
}