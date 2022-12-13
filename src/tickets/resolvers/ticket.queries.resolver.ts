import {Resolver} from "@nestjs/graphql";
import {TicketService} from "../ticket.service";
import {JwtAtGuard} from "../../auth/guards/jwt-at.guard";
import {UseGuards} from "@nestjs/common";
import {Ticket} from "../entities/ticket.entity";

@UseGuards(JwtAtGuard)
@Resolver(Ticket)
export class TicketQueriesResolver {
  constructor(private readonly ticketService: TicketService) {
  }

}