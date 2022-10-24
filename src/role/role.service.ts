import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {SortDirection} from "../pagination/dto/pagination.dto";
import {RolesPaginationArgs, RolesPagination} from "./dto/role.pagination.dto";
import {RoleCreateInput, RoleCreateOutput} from './dto/role-create.dto';
import {Role} from "./models/role.model";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {
    }

    async roleCreate(input: RoleCreateInput): Promise<RoleCreateOutput> {
        const role = this.roleRepository.create(input);
        await role.save();
        return {
            role,
        };
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
