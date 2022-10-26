import {Parent, ResolveField, Resolver} from "@nestjs/graphql";
import {User} from "../entities/user.entity";
import {UserService} from "../user.service";
import {Role} from "../../role/entities/role.entity";

@Resolver(User)
export class UserFieldsResolver {
    constructor(private userService: UserService) {}

    @ResolveField(() => Role)
    async role(@Parent() user: User) {
        return await this.userService.getRoleById(user.roleId);
    }
}