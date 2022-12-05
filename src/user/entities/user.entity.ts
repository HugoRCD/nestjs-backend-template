import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Node} from 'src/pagination/entities/node.entity';
import {Column, Entity} from 'typeorm';
import {Role} from "../../auth/decorators/role.enum";

@Entity()
@ObjectType()
export class User extends Node {
    @Field(() => String)
    @Column({unique: true})
    username: string;

    @Field(() => String)
    @Column()
    firstname: string;

    @Field(() => String)
    @Column()
    lastname: string;

    @Field(() => Date)
    @Column()
    birthdate: Date;

    @Field(() => String)
    @Column({unique: true})
    email: string;

    @Field(() => String)
    @Column()
    telephone: string;

    @Column()
    password: string;

    @Field(() => Int, {defaultValue: Role.USER})
    @Column({default: Role.USER})
    role: number;

    @Field(() => String, {nullable: true})
    @Column({nullable: true})
    avatar?: string;

    @Field(() => Boolean)
    @Column({default: false})
    isVerified: boolean;

    @Field(() => String)
    @Column({nullable: true, length: 600})
    token: string;
}
