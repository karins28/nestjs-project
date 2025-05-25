import { Controller, Get, Post, Delete, Param, Query, Body, Put, ValidationPipe, UsePipes } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dtos/book.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('books')
export class BooksController {
     constructor(private readonly booksService: BooksService) { }
    @Get(':id')
    async findOne(@Param('id') id: string){
        return await this.booksService.findOne(id)
    }
    @Get()
    async findAll(@Query('sort') sort: 'asc'| 'desc' = 'desc'){
        return await this.booksService.findAll('name', sort)
    }
    
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post()
    async create(@Body() input: CreateBookDto){
       return await this.booksService.create(input)
    }
    
    @UsePipes(new ValidationPipe({ transform: true }))
    @Put(':id')
    async updatePartialBook(@Param('id') id: string, @Body() updateData: UpdateBookDto) {
       return await this.booksService.updatePartialBook(id, updateData)

    }
    @Delete(':id')
    async deleteBook(@Param('id') id:string){
       return await this.booksService.deleteBook(id)
    }

}
