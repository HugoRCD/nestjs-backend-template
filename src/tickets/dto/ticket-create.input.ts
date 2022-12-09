import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateTicketInput {
  @Field(() => String, {description: "Ticket type"})
    type: string;

  @Field(() => String, {description: "Ticket description"})
    description: string;
}