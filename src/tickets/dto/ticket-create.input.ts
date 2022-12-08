import {Field, InputType} from "@nestjs/graphql";
import {TicketType} from "../enum/type.enum";

@InputType()
export class CreateTicketInput {
  @Field(() => TicketType, {description: "Ticket type"})
    type: string;

  @Field(() => String, {description: "Ticket description"})
    description: string;

  @Field(() => String, {description: "User email"})
    email: string;
}