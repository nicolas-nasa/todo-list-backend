import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  size?: 10;

  @ApiProperty()
  page?: 0;
}
