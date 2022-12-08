import {Resolver} from "@nestjs/graphql";
import {TicketsService} from "../tickets.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {Ticket} from "../entities/ticket.entity";

@UseGuards(JwtAuthGuard)
@Resolver(Ticket)
export class TicketsMutationsResolver {
  constructor(private readonly ticketsService: TicketsService) {
  }

  /*@Mutation(() => Ticket)
  async createTicket(@Args("createTicketInput") createTicketInput: CreateTicketInput) {
    return this.ticketsService.createTicket(createTicketInput);
  }*/
}
