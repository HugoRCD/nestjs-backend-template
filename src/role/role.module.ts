import {Module} from '@nestjs/common';
import {RoleService} from './role.service';
import {RoleMutations} from './resolvers/role.mutations';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {User} from "../user/entities/user.entity";
import {RolesQueriesResolver} from "./resolvers/role.queries";

@Module({
    imports: [TypeOrmModule.forFeature([Role, User])],
    providers: [RoleMutations, RoleService, RolesQueriesResolver],
    exports: [RoleService]
})
export class RoleModule {
}
