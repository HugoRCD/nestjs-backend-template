import {Parent, ResolveField, Resolver} from "@nestjs/graphql";
import {Role} from "../entities/role.entity";
import {RoleService} from "../role.service";
import {User} from "../../user/entities/user.entity";

@Resolver(Role)
export class UserFieldsResolver {
    constructor(private roleService: RoleService) {}

    @ResolveField(() => [User])
    async user(@Parent() role: Role) {
        return await this.roleService.getUsersByRole(role.id); // TODO fix this
    }
}