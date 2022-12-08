import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MailingService} from "../mailing/mailing.service";
import {Ticket} from "./entities/ticket.entity";

@Injectable()
export class TicketsService {
  constructor(
      @InjectRepository(Ticket)
      private userRepository: Repository<Ticket>,
      private MailingService: MailingService,
  ) {
  }
}
