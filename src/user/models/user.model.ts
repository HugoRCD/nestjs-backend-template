import {Field, ObjectType} from '@nestjs/graphql';
import {Node} from 'src/pagination/models/node.model';
import {Column, Entity, JoinColumn, ManyToOne, RelationId} from 'typeorm';
import {Role} from "./role.model";

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

    @Field(() => String, {nullable: true})
    @Column({nullable: true})
    avatar?: string;
}
