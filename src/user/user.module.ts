import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UserMutationsResolver} from './resolvers/user.mutations.resolver';
import {UserService} from './user.service';
import {UserQueriesResolver} from "./resolvers/user.queries.resolver";
import {MailingModule} from "../mailing/mailing.module";
import {VerifCode} from "./entities/verif-code.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([VerifCode]),
        forwardRef(() => MailingModule),
    ],
    providers: [
        UserService,
        UserMutationsResolver,
        UserQueriesResolver,
    ],
    exports: [UserService],
})
export class UserModule {
}
