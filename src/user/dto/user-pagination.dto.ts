import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from 'src/pagination/dto/pagination.dto';
import { User } from "../models/user.model";

@InputType()
export class UsersPaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  title?: SortDirection;
}

@ArgsType()
export class UsersPaginationArgs extends PaginationArgs {
  @Field(() => UsersPaginationSortBy, { nullable: true })
  sortBy?: UsersPaginationSortBy;
}

@ObjectType()
export class UsersPagination extends Pagination {
  @Field(() => [User])
  nodes: User[];
}
