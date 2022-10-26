import {Injectable} from '@nestjs/common';
import {CreateRoleInput, CreateRoleOutput} from './dto/create-role.input';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Repository} from "typeorm";
import {SortDirection} from "../pagination/dto/pagination.dto";
import {RolesPagination, RolesPaginationArgs} from "./dto/role-pagination.dto";
import {User} from "../user/entities/user.entity";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

    async createRole(createRoleInput: CreateRoleInput): Promise<CreateRoleOutput> {
        const role = this.roleRepository.create(createRoleInput);
        await role.save();
        return {
            role,
        }
    }

    getAllRoles() {
        return this.roleRepository.find();
    }

    getUsersByRole(roleId: number): Promise<User[]> {
        return this.roleRepository
            .createQueryBuilder('role')
            .leftJoinAndSelect('role.users', 'users')
            .where('role.id = :roleId', {roleId})
            .getOne()
            .then(role => role.users);
    }

    getRoleById(id: number) {
        return this.roleRepository.findOne(id);
    }

    async rolesPagination(
        args: RolesPaginationArgs,
    ): Promise<RolesPagination> {
        const qb = this.roleRepository.createQueryBuilder('role');
        qb.take(args.take);
        qb.skip(args.skip);
        if (args.sortBy) {
            if (args.sortBy.createdAt !== null) {
                qb.addOrderBy(
                    'role.createdAt',
                    args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
                );
            }
        }
        const [nodes, totalCount] = await qb.getManyAndCount();
        return {nodes, totalCount};
    }
}
