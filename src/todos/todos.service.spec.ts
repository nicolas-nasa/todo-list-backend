import { UserEntity } from '@/users/entities/user.entity';
import { MockType, repositoryMockFactory } from '@/utils/mock.utils';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;
  let repositoryMockUser: MockType<Repository<UserEntity>>;
  let repositoryMockTodo: MockType<Repository<TodoEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(TodoEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repositoryMockUser = module.get(getRepositoryToken(UserEntity));
    repositoryMockTodo = module.get(getRepositoryToken(TodoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMockUser).toBeDefined();
    expect(repositoryMockTodo).toBeDefined();
  });
});
