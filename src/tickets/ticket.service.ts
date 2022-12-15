import {Injectable, UseGuards} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MailingService} from "../mailing/mailing.service";
import {Ticket} from "./entities/ticket.entity";
import {CreateTicketInput} from "./dto/ticket-create.input";
import {UpdateTicketInput} from "./dto/ticket-update.input";
import {JwtAtGuard} from "../auth/guards/jwt-at.guard";
import {JWTPayload} from "../auth/auth.service";

@UseGuards(JwtAtGuard)
@Injectable()
export class TicketService {
  constructor(
      @InjectRepository(Ticket)
      private ticketRepository: Repository<Ticket>,
      private MailingService: MailingService,
  ) {
  }

  async create(ticket: CreateTicketInput, user: JWTPayload) {
    const name = "#" + Math.floor(Math.random() * 10000) + " - " + ticket.type;
    const email = user.email;
    const ownerId = user.id;
    const createdTicket = this.ticketRepository.create({
      ...ticket,
      name,
      email,
      ownerId
    });
    await this.ticketRepository.save(createdTicket);
    return createdTicket;
  }

  async update(ticket: UpdateTicketInput, id: number) {
    const ticketToUpdate = await this.ticketRepository.findOne(id);
    if (ticketToUpdate) {
      await this.ticketRepository.update(id, ticket);
      return await this.ticketRepository.findOne(id);
    }
    throw new Error("Ticket not found");
  }

  async delete(id: number) {
    const ticket = await this.ticketRepository.findOne(id);
    await this.ticketRepository.remove(ticket);
    return {
      message: "Ticket deleted " + id + " deleted successfully",
    };
  }

  async getTickets() {
    return await this.ticketRepository.find();
  }

  async getTicket(id: number) {
    return await this.ticketRepository.findOne(id);
  }
}
