import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {RoleCreateInput, RoleCreateOutput} from '../dto/role/role.create.dto';
import {Role} from "../models/role.model";
import {RoleService} from "../role.service";

@Resolver(Role)
export class RoleMutationsResolver {
    constructor(private readonly roleService: RoleService) {
    }

    @Mutation(() => RoleCreateOutput)
    async roleCreate(@Args('input') input: RoleCreateInput) {
        return this.roleService.roleCreate(input);
    }
}
