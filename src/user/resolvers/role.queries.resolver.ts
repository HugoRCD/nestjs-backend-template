import {Args, Query, Resolver} from "@nestjs/graphql";
import {RoleService} from "../role.service";
import {Role} from "../models/role.model";

@Resolver(Role)
export class RoleQueriesResolver {
    constructor(private readonly roleService: RoleService) {
    }

    @Query(() => [Role])
    async getRoles() {
        return this.roleService.getRoles();
    }
}