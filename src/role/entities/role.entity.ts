import {ObjectType, Field, Int} from '@nestjs/graphql';
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity()
@ObjectType()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int, {description: 'Primary Key'})
    id: number;

    @Column({unique: true})
    @Field(() => String, {description: 'Role name'})
    name: string;

    @Column({nullable: true})
    @Field(() => String, {description: 'Role description'})
    description: string;

    @OneToMany(() => User, user => user.role)
    @Field(() => [User], {nullable: true, description: 'Users with this role'})
    users?: User[];

    @Field(() => Date, {description: 'Creation date'})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Field(() => Date, {description: 'Last update date'})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
