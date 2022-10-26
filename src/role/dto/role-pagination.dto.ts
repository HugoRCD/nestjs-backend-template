import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from 'src/pagination/dto/pagination.dto';
import { Role } from "../entities/role.entity";

@InputType()
export class RolesPaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  name?: SortDirection;
}

@ArgsType()
export class RolesPaginationArgs extends PaginationArgs {
  @Field(() => RolesPaginationSortBy, { nullable: true })
  sortBy?: RolesPaginationSortBy;
}

@ObjectType()
export class RolesPagination extends Pagination {
  @Field(() => [Role])
  nodes: Role[];
}
