import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UserMutationsResolver} from './resolvers/user.mutations.resolver';
import {UserService} from './user.service';
import {UserQueriesResolver} from "./resolvers/user.queries.resolver";
import {RoleModule} from "../role/role.module";
import {Role} from "../role/entities/role.entity";
import {UserFieldsResolver} from "./resolvers/user.fields.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), forwardRef(() => RoleModule)],
    providers: [
        UserService,
        UserMutationsResolver,
        UserQueriesResolver,
        UserFieldsResolver
    ],
    exports: [UserService],
})
export class UserModule {
}
