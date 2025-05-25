import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import type {ICreateBookDto, IUpdateBookDto } from '@shared/types'

export class CreateBookDto implements ICreateBookDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @IsString({ message: 'Author must be a string.' })
  @IsNotEmpty({ message: 'Author cannot be empty.' })
  author: string;

  @IsInt({ message: 'Published year must be an integer.' })
  @Min(1000, { message: 'Published year must be a valid year (e.g., 1900).' })
  @Max(new Date().getFullYear(), { message: 'Published year cannot be in the future.' })
  @IsOptional()
  publishedYear?: number;
}

export class UpdateBookDto extends PartialType(CreateBookDto) implements IUpdateBookDto {}
