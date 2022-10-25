import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {User} from '../../models/user.model';
import {Role} from "../../models/role.model";
import {IsAlpha, IsDate, IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

@InputType()
export class UserCreateInput {
    @Field(() => String)
    username: string;

    @IsAlpha()
    @Field(() => String)
    firstname: string;

    @IsAlpha()
    @Field(() => String)
    lastname: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @IsNotEmpty()
    @Field(() => String)
    password: string;

    @Field(() => String)
    role: Role['id'];

    @Field(() => String, {nullable: true})
    avatar?: string;

    @IsPhoneNumber('FR')
    @Field(() => String)
    telephone: string;

    @IsDate()
    @Field(() => Date)
    birthdate: Date;
}

@ObjectType()
export class UserCreateOutput {
    @Field(() => User)
    user: User;
}
