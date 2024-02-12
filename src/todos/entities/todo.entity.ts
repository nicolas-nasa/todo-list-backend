import { BaseEntity } from '@/entities/base.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'varchar' })
  status: 'to-do' | 'doing' | 'done';

  @ManyToOne(() => UserEntity, (user) => user.todos)
  user: UserEntity;
}
