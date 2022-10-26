import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserInput, CreateUserOutput} from './dto/user-create.input';
import {User} from './entities/user.entity';
import {SortDirection} from "../pagination/dto/pagination.dto";
import {UsersPagination, UsersPaginationArgs} from "./dto/user-pagination.dto";
import {Role} from "../role/entities/role.entity";
import {RoleService} from "../role/role.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private roleService: RoleService,
    ) {
    }

    async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
        const user = this.userRepository.create(input);
        await user.save();
        return {
            user,
        };
    }

    async userGetByLogin(login: string): Promise<User> {
        return this.userRepository.findOne({where: [{email: login}, {username: login}, {telephone: login}]});
    }

    getRole(roleId: number): Promise<Role> {
        return this.roleService.findOne(roleId);
    }

    async usersPagination(
        args: UsersPaginationArgs,
    ): Promise<UsersPagination> {
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
    }
}
