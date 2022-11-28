import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class VerifCode {
    @PrimaryGeneratedColumn()
    @Field(() => Int, {description: 'Primary Key'})
    id: number;

    @Field(() => String, {description: 'User email'})
    @Column()
    email: string;

    @Field(() => String, {description: 'Verification code'})
    @Column()
    code: string;

    @Field(() => Date, {description: 'Creation date'})
    @CreateDateColumn()
    createdAt: Date;
}