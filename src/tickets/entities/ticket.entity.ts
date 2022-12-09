import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {TicketType} from "../enum/type.enum";
import {TicketStatus} from "../enum/status.enum";

@Entity()
@ObjectType()
export class Ticket {
  @PrimaryGeneratedColumn()
  @Field(() => Int, {description: "Primary Key"})
    id: number;
  
  @Field(() => String, {description: "Ticket name"})
  @Column({unique: true})
    name: string;

  @Field(() => String, {description: "Ticket type"})
  @Column({default: TicketType.INFO})
    type: string;
  
  @Field(() => String, {description: "Ticket description"})
  @Column()
    description: string;
  
  @Field(() => String, {description: "Ticket status"})
  @Column({default: TicketStatus.OPEN})
    status: string;

  @ManyToOne(() => User)
  @Field(() => User, {description: "Ticket owner"})
    owner: User;

  @Column()
    ownerId: number;

  @Field(() => String, {description: "User email"})
  @Column()
    email: string;

  @Field(() => Date, {description: "Creation date"})
  @CreateDateColumn()
    createdAt: Date;
  
  @Field(() => Date, {description: "Update date"})
  @UpdateDateColumn()
    updatedAt: Date;
}
