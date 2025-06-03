import { Injectable, InternalServerErrorException} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto, UpdateBookDto } from './dtos/book.dto';
@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
      return await this.prisma.book.findUniqueOrThrow({where: {id}})
  }

  async findAll(sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc', page=1, limit=1) {
  try {
    const orderBy = sortBy ? [{ [sortBy]: sortOrder }] : undefined;
    console.log(page)
  const [totalCount, data] = await this.prisma.$transaction([
    this.prisma.book.count(),
    this.prisma.book.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy 
    }),
  ]);
  
    const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    meta: {
      total: totalCount,
      totalPages: totalPages,
      currentPage: page,
      limit: limit
    },
  };
}
  catch (error) {
    throw new InternalServerErrorException(error.message);
  }
}

  async create(input: CreateBookDto) {
      return await this.prisma.book.create({ data: { ...input } }); 
  }

  async updatePartialBook(id: string, updateData: UpdateBookDto) {
    try {
      const book = await this.prisma.book.update({ 
        where: { id }, 
        data: { ...updateData },
      });
      return book;
    } catch (error) {
        throw new InternalServerErrorException("Error Updating book");
    }
  }

  async deleteBook(id: string) {
      return await this.prisma.book.delete({ 
        where: { id },
})}
}
