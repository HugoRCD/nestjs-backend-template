import {Resolver, Mutation, Args} from '@nestjs/graphql';
import {RoleService} from '../role.service';
import {Role} from '../entities/role.entity';
import {CreateRoleInput, CreateRoleOutput} from '../dto/create-role.input';

@Resolver(Role)
export class RoleMutations {
    constructor(private readonly roleService: RoleService) {
    }

    @Mutation(() => CreateRoleOutput)
    async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
        return this.roleService.createRole(createRoleInput);
    }
}