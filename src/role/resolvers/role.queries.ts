import {Args, Int, Query, Resolver} from "@nestjs/graphql";
import {RoleService} from "../role.service";
import {Role} from "../entities/role.entity";
import {RolesPagination, RolesPaginationArgs} from "../dto/role-pagination.dto";

@Resolver(Role)
export class RolesQueriesResolver {
    constructor(private readonly roleService: RoleService) {
    }

    @Query(() => RolesPagination)
    async rolesPagination(@Args() args: RolesPaginationArgs) {
        return this.roleService.rolesPagination(args);
    }

    @Query(() => [Role])
    findAll() {
        return this.roleService.findAll();
    }

    @Query(() => Role, {name: 'role'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.roleService.findOne(id);
    }
}