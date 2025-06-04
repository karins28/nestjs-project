import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import type {IBookQueryDto, IBook, ICreateBookDto, IUpdateBookDto } from '@shared/types'

type BookProps = Array<keyof IBook>;
const IBookKeys: (keyof IBook)[] = ['author', 'id', 'name', 'publishYear']

export class BookQueryDto implements IBookQueryDto {
  @IsIn(IBookKeys)
  @IsOptional()
  sort: BookProps;

  @IsInt({ message: 'Name must be a string.' })
  @IsPositive({message: 'Number is invalid'})
  page: number;
}

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
  publishYear?: number;
}

export class UpdateBookDto extends PartialType(CreateBookDto) implements IUpdateBookDto {}