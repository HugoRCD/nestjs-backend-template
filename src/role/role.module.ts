import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Role} from './models/role.model';
import {RoleMutationsResolver} from './resolvers/role.mutations.resolver';
import {RoleService} from './role.service';
import {RoleQueriesResolver} from "./resolvers/role.queries.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [
        RoleService,
        RoleMutationsResolver,
        RoleQueriesResolver,
    ],
    exports: [RoleService],
})
export class RoleModule {
}
