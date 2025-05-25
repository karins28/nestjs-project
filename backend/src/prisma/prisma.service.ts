import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma Client connected');
    } catch (error) {
      console.error('Error connecting Prisma Client:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma Client disconnected');
  }
}
