import {InputType} from "@nestjs/graphql";
import {CreateTicketInput} from "./ticket-create.input";

@InputType()
export class UpdateTicketInput extends CreateTicketInput {
}