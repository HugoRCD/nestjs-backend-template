import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {User} from '../../models/user.model';

@InputType()
export class UserCreateInput {
    @Field(() => String)
    username: string;

    @Field(() => String)
    firstname: string;

    @Field(() => String)
    lastname: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => String, {nullable: true})
    avatar?: string;

    @Field(() => String)
    telephone: string;

    @Field(() => Date)
    birthdate: Date;
}

@ObjectType()
export class UserCreateOutput {
    @Field(() => User)
    user: User;
}
