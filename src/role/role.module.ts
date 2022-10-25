import {forwardRef, Module} from '@nestjs/common';
import {RoleService} from './role.service';
import {RoleResolver} from './role.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {User} from "../user/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Role, User])],
    providers: [RoleResolver, RoleService],
    exports: [RoleService]
})
export class RoleModule {
}
