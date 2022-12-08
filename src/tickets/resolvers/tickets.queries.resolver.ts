import {Resolver} from "@nestjs/graphql";
import {TicketsService} from "../tickets.service";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {UseGuards} from "@nestjs/common";
import {Ticket} from "../entities/ticket.entity";

@UseGuards(JwtAuthGuard)
@Resolver(Ticket)
export class TicketsQueriesResolver {
  constructor(private readonly ticketsService: TicketsService) {
  }

}