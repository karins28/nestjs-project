import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BooksModule, PrismaModule],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService, ],
})
export class AppModule {}
