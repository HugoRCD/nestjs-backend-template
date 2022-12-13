import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {TicketService} from "../ticket.service";
import {UseGuards} from "@nestjs/common";
import {CurrentUser, JwtAtGuard} from "../../auth/guards/jwt-at.guard";
import {Ticket} from "../entities/ticket.entity";
import {CreateTicketInput} from "../dto/ticket-create.input";
import {UpdateTicketInput} from "../dto/ticket-update.input";
import {UserService} from "../../user/user.service";
import {JWTPayload} from "../../auth/auth.service";

@UseGuards(JwtAtGuard)
@Resolver(Ticket)
export class TicketMutationsResolver {
  constructor(
      private readonly ticketService: TicketService,
      private readonly userService: UserService,
  ) {
  }

  @Mutation(() => Ticket)
  async createTicket(
      @Args("ticket") ticket: CreateTicketInput,
      @CurrentUser() user: JWTPayload) {
    return this.ticketService.create(ticket, user);
  }

  @Mutation(() => Ticket)
  async updateTicket(
      @Args("ticket") ticket: UpdateTicketInput,
      @Args("id") id: number,
  ) {
    return this.ticketService.update(ticket, id);
  }

  @Mutation(() => Ticket)
  async deleteTicket(
      @Args("id") id: number,
  ) {
    return this.ticketService.delete(id);
  }

  @Query(() => [Ticket])
  async getTickets() {
    return this.ticketService.getTickets();
  }

  @Query(() => Ticket)
  async getTicket(
      @Args("id") id: number,
  ) {
    return this.ticketService.getTicket(id);
  }
}
