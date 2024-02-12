import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  login(createUserDto: LoginUserDto): Promise<UserEntity> {
    return this.userRepository.findOneBy({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  viewUser(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.softDelete(id);
  }
}
