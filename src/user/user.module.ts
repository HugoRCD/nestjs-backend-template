import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './models/user.model';
import {UserMutationsResolver} from './resolvers/user.mutations.resolver';
import {UserService} from './user.service';
import {UserQueriesResolver} from "./resolvers/user.queries.resolver";

import {Role} from "./models/role.model";
import {RoleMutationsResolver} from "./resolvers/role.mutations.resolver";
import {RoleService} from "./role.service";
import {RoleQueriesResolver} from "./resolvers/role.queries.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
    providers: [
        UserService,
        UserMutationsResolver,
        UserQueriesResolver,
        RoleService,
        RoleMutationsResolver,
        RoleQueriesResolver
    ],
    exports: [UserService],
})
export class UserModule {
}
