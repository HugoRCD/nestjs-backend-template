import { Test, TestingModule } from '@nestjs/testing';
import { RoleMutations } from './resolvers/role.mutations';
import { RoleService } from './role.service';

describe('RoleResolver', () => {
  let resolver: RoleMutations;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleMutations, RoleService],
    }).compile();

    resolver = module.get<RoleMutations>(RoleMutations);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
