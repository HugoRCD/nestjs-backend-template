import {Field, ID, ObjectType} from '@nestjs/graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn, RelationId,
    UpdateDateColumn
} from 'typeorm';

@Entity()
@ObjectType()
export class Role extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column({unique: true})
    name: string;

    @Field(() => String)
    @Column({nullable: true})
    description: string;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
