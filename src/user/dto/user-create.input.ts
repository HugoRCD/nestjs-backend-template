import {Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {User} from '../entities/user.entity';
import {IsAlpha, IsDate, IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

@InputType()
export class CreateUserInput {
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

    @Field(() => Int)
    roleId: number;

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
export class CreateUserOutput {
    @Field(() => User)
    user: User;
}
