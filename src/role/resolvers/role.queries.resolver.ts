import {Args, Query, Resolver} from "@nestjs/graphql";
import {Role} from "../models/role.model";
import {RoleService} from "../role.service";
import {RolesPagination, RolesPaginationArgs} from "../dto/role.pagination.dto";

@Resolver(Role)
export class RoleQueriesResolver {
    constructor(private readonly roleService: RoleService) {
    }

    @Query(() => RolesPagination)
    async usersPagination(@Args() args: RolesPaginationArgs) {
        return this.roleService.rolesPagination(args);
    }
}