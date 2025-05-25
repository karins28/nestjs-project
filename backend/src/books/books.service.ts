import { Injectable, InternalServerErrorException} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto, UpdateBookDto } from './dtos/book.dto';
@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
      return await this.prisma.book.findUniqueOrThrow({where: {id}})
  }

  async findAll(sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc') {
    const orderBy = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;

    try {
  const res =  await this.prisma.book.findMany({ orderBy: sortBy ? [orderBy] : undefined})
        return res
  }
         catch (error) {
        throw new InternalServerErrorException("item not found");
    }
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
