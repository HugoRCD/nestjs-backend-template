import {Resolver, Query, Mutation, Args, Int, Parent, ResolveField} from '@nestjs/graphql';
import {RoleService} from './role.service';
import {Role} from './entities/role.entity';
import {CreateRoleInput, CreateRoleOutput} from './dto/create-role.input';

@Resolver(Role)
export class RoleResolver {
    constructor(private readonly roleService: RoleService) {
    }

    @Mutation(() => Role)
    async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
        return this.roleService.create(createRoleInput);
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
