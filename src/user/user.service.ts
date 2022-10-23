import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserCreateInput, UserCreateOutput} from './dto/user-create.dto';
import {User} from './models/user.model';
import {SortDirection} from "../pagination/dto/pagination.dto";
import {UsersPagination, UsersPaginationArgs} from "./dto/user-pagination.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async userCreate(input: UserCreateInput): Promise<UserCreateOutput> {
        const user = this.userRepository.create(input);
        await user.save();
        return {
            user,
        };
    }

    async userGet(email: User['email']): Promise<User> {
        return await this.userRepository.findOneOrFail({email});
    }

    async userGetById(id: User['id']): Promise<User> {
        return await this.userRepository.findOneOrFail({id});
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
        // const [nodes, totalCount] = await this.articleRepository.findAndCount({
        //   skip: args.skip,
        //   take: args.take,
        //   order: {
        //     createdAt:
        //       args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        //     title: args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        //   },
        // });
        return {nodes, totalCount};
    }
}
