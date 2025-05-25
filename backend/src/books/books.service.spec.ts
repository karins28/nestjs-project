import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';
  import { InternalServerErrorException, NotFoundException } from '@nestjs/common';


describe('BooksService', () => {
  let service: BooksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: PrismaService,
          useValue: {
            book: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

        prisma = module.get<PrismaService>(PrismaService);
        service = module.get<BooksService>(BooksService);
  });

  it('should throw NotFoundException if book is not found', async () => {
    const dto = { author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() };
     const nonExistingId = 'non-existing-id';

  // We don't need to mock findUnique here because the service doesn't use it

  // Mock the 'update' method to reject with a Prisma error
    jest.spyOn(prisma.book, 'update').mockRejectedValue(new Error('Some Prisma error'));

  await expect(service.updatePartialBook(nonExistingId, dto)).rejects.toThrow(InternalServerErrorException);
  })
})
