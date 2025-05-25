import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  book: {
    findUnique: jest.fn(),
    update: jest.fn(),
  }
};


describe('BooksController', () => {

  let controller: BooksController;
  let service: BooksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService,  { provide: PrismaService, useValue: mockPrisma }]
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
    console.log('service:', service);

  });

it('should return an array of books', async () => {
  const result = [{ id: '1', author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() }, 
    { id: '2', author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() }
  ];
  jest.spyOn(service, 'findAll').mockResolvedValue(result);
  expect(await controller.findAll()).toEqual(result);
});

it('should return one book', async () => {
  const book = { id: '1', author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() }
  jest.spyOn(service, 'findOne').mockResolvedValue(book);
  expect(await controller.findOne('1')).toEqual(book);
});

it('should create a book', async () => {
  const dto = { author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() };
  const created = { id: '2', ...dto };
  jest.spyOn(service, 'create').mockResolvedValue(created);
  expect(await controller.create(dto)).toEqual(created);
});

it('should update a book', async () => {
  const dto = { author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() };
  const created = { id: '2', ...dto };
  jest.spyOn(service, 'updatePartialBook').mockResolvedValue(created);
  expect(await controller.updatePartialBook('2',  dto)).toEqual(created)

  // Optional: verify that service.updatePartialBook was called with the right arguments
  expect(service.updatePartialBook).toHaveBeenCalledWith('2', dto);

});

describe('with existing book', () => {
    let id: string = '3'

    beforeAll(async () => {
    const dto = { author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() };
    const created = { id: '3', ...dto };
    jest.spyOn(service, 'create').mockResolvedValue(created);
    });

    it('should update the booke', async () => {
  const dto = { author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() };
  jest.spyOn(service, 'updatePartialBook').mockResolvedValue({id, ...dto});
  expect(await controller.updatePartialBook('2',  dto)).toEqual({...dto, id})

    })

    it('should delete the book', async () => {
  const dto = { author: '1984', name: 'name', publishYear: 2025, createdAt: new Date() };
  const created = { id: '2', ...dto };
  jest.spyOn(service, 'updatePartialBook').mockResolvedValue(created);
  expect(await controller.updatePartialBook('2',  dto)).toEqual(created)

  // Optional: verify that service.updatePartialBook was called with the right arguments
  expect(service.updatePartialBook).toHaveBeenCalledWith('2', dto);
  });
})})