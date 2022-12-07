import {Field, Int, InterfaceType} from "@nestjs/graphql";
import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn,} from "typeorm";

@InterfaceType()
export abstract class Node extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int, {description: "Primary Key"})
    id: number;

  @Field(() => Date, {description: "Creation date"})
  @CreateDateColumn()
    createdAt: Date;

  @Field(() => Date, {description: "Last update date"})
  @UpdateDateColumn()
    updatedAt: Date;
}
