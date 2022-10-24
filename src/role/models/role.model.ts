import {Field, ObjectType} from "@nestjs/graphql";
import {Node} from 'src/pagination/models/node.model';
import {Column, Entity, OneToMany} from 'typeorm';

@Entity()
@ObjectType()
export class Role extends Node {
    @Field(() => String)
    @Column({unique: true})
    name: string;

    @Field(() => String)
    @Column({nullable: true})
    description: string;
}