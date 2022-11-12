import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UserMutationsResolver} from './resolvers/user.mutations.resolver';
import {UserService} from './user.service';
import {UserQueriesResolver} from "./resolvers/user.queries.resolver";
import {MailingModule} from "../mailing/mailing.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => MailingModule)],
    providers: [
        UserService,
        UserMutationsResolver,
        UserQueriesResolver,
    ],
    exports: [UserService],
})
export class UserModule {
}
