import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RoleCreateInput, RoleCreateOutput} from './dto/role/role.create.dto';
import {Role} from './models/role.model';

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
}
