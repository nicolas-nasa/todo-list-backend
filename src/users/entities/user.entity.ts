import { BaseEntity } from '@/entities/base.entity';
import { TodoEntity } from '@/todos/entities/todo.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;
  @Column({ name: 'last_Name', type: 'varchar' })
  lastName: string;
  @Column({ name: 'email', type: 'varchar' })
  email: string;
  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToMany(() => TodoEntity, (todos) => todos.user)
  todos: TodoEntity[];
}
