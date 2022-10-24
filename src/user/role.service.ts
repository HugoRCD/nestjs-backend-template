import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RoleCreateInput, RoleCreateOutput} from './dto/role/role.create.dto';
import {Role} from './models/role.model';
import {SortDirection} from "../pagination/dto/pagination.dto";
import {UsersPagination, UsersPaginationArgs} from "./dto/user/user-pagination.dto";

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

    async getRoles() {
        return this.roleRepository.find();
    }

    /*async usersPagination(
        args: RolesPaginationArgs,
    ): Promise<RolesPagination> {
        const qb = this.userRepository.createQueryBuilder('user');
        qb.take(args.take);
        qb.skip(args.skip);
        if (args.sortBy) {
            if (args.sortBy.createdAt !== null) {
                qb.addOrderBy(
                    'user.createdAt',
                    args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
                );
            }
        }
        const [nodes, totalCount] = await qb.getManyAndCount();
        return {nodes, totalCount};
    }*/
}
