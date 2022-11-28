import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class VerifCode {
    @PrimaryGeneratedColumn()
    @Field(() => Int, {description: 'Primary Key'})
    id: number;

    @Field(() => String, {description: 'User email'})
    @Column({unique: true})
    email: string;

    @Field(() => String, {description: 'Verification code'})
    @Column()
    code: string;
}