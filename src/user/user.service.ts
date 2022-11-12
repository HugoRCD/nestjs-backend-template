import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserInput, CreateUserOutput} from './dto/user-create.input';
import {User} from './entities/user.entity';
import {SortDirection} from "../pagination/dto/pagination.dto";
import {UsersPagination, UsersPaginationArgs} from "./dto/user-pagination.dto";
import {MailingService} from "../mailing/mailing.service";
import {UpdateUserInput, UpdateUserOutput} from "./dto/user-update.input";
import {DeleteUserOutput} from "./dto/user-delete.input";
import {JWTPayload} from "../auth/auth.service";

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private MailingService: MailingService,
    ) {
    }

    async hashPassword(passwordToHash: string) {
        const saltRounds = 10;
        return bcrypt.hash(passwordToHash, saltRounds);
    }

    async deHashPassword(passwordToDeHash: string, passwordHash: string) {
        return bcrypt.compare(passwordToDeHash, passwordHash);
    }

    async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
        input.password = await this.hashPassword(input.password);
        const user = this.userRepository.create(input);
        await user.save();
        this.MailingService.sendMail(user, 'welcome', 'Welcome !!!',
            {
                username: user.username + ' ' + user.lastname,
            });
        return {
            user,
        };
    }

    async updateUser(userId: User['id'], input: UpdateUserInput): Promise<UpdateUserOutput> {
        const user = await this.userRepository.findOne(userId);
        if (input.password) {
            input.password = await this.hashPassword(input.password);
        }
        this.userRepository.merge(user, input);
        await this.userRepository.save(user);
        return {
            user,
        };
    }

    async deleteUser(userId: User['id']): Promise<DeleteUserOutput> {
        const user = await this.userRepository.findOne(userId);
        await this.userRepository.remove(user);
        return {
            message: 'User deleted ' + userId + ' deleted successfully',
        }
    }

    async userGetByLogin(login: string): Promise<User> {
        return this.userRepository.findOne({where: [{email: login}, {username: login}, {telephone: login}]});
    }

    async getUserById(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async verifyUser(user: JWTPayload): Promise<User> {
        const userToVerify = await this.userRepository.findOne(user.id);
        if (userToVerify) {
            userToVerify.isVerified = true;
            await this.userRepository.save(userToVerify);
        }
        return userToVerify;
    }

    async insertToken(user: number, token: string) {
        const userToInsert = await this.userRepository.findOne(user);
        userToInsert.token = token;
        await this.userRepository.save(userToInsert);
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
