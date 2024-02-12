import { PaginationDto } from '@/dto/pagination.dto';
import { UserEntity } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo: TodoEntity = new TodoEntity();

    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.status = createTodoDto.status;
    todo.user = await this.userRepository.findOneBy({
      id: createTodoDto.userId,
    });
    return this.todoRepository.save(todo);
  }

  async viewTodosByUser(
    id: string,
    query: PaginationDto,
  ): Promise<{ data: TodoEntity[]; totalPages: number; actualPage: number }> {
    const [result, total] = await this.todoRepository.findAndCount({
      where: { user: { id } },
      take: query.size,
      skip: query.page * query.size,
    });
    return {
      data: result,
      totalPages: parseFloat((total / query.size).toFixed(0)),
      actualPage: parseFloat(query.page + ''),
    };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo: TodoEntity = new TodoEntity();
    todo.id = id;
    todo.title = updateTodoDto.title;
    todo.description = updateTodoDto.description;
    todo.status = updateTodoDto.status;

    return this.todoRepository.save(todo);
  }

  remove(id: string) {
    return this.todoRepository.softDelete(id);
  }
}
