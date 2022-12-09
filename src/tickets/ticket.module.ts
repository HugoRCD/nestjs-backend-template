import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ticket} from "./entities/ticket.entity";
import {TicketMutationsResolver} from "./resolvers/ticket.mutations.resolver";
import {TicketService} from "./ticket.service";
import {TicketQueriesResolver} from "./resolvers/ticket.queries.resolver";
import {MailingModule} from "../mailing/mailing.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => MailingModule),
  ],
  providers: [
    TicketService,
    TicketMutationsResolver,
    TicketQueriesResolver,
  ],
  exports: [TicketService],
})
export class TicketModule {
}
