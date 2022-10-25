import {Injectable} from '@nestjs/common';
import {CreateRoleInput} from './dto/create-role.input';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Repository} from "typeorm";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

    create(createRoleInput: CreateRoleInput): Promise<Role> {
        const role = this.roleRepository.create(createRoleInput);
        return this.roleRepository.save(role);
    }

    findAll() {
        return this.roleRepository.find();
    }

    findOne(id: number) {
        return this.roleRepository.findOne(id);
    }
}
