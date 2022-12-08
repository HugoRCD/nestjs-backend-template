import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ticket} from "./entities/ticket.entity";
import {TicketsMutationsResolver} from "./resolvers/tickets.mutations.resolver";
import {TicketsService} from "./tickets.service";
import {TicketsQueriesResolver} from "./resolvers/tickets.queries.resolver";
import {MailingModule} from "../mailing/mailing.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => MailingModule),
  ],
  providers: [
    TicketsService,
    TicketsMutationsResolver,
    TicketsQueriesResolver,
  ],
  exports: [TicketsService],
})
export class TicketsModule {
}
