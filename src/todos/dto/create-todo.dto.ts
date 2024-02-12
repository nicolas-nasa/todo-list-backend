import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export enum EStatus {
  'to-do',
  'doing',
  'done',
}

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  status: 'to-do' | 'doing' | 'done';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
