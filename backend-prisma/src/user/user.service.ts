import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: { name: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async seed() {
    const users = await this.prisma.user.findMany();
    if (users.length === 0) {
      await this.prisma.user.create({
        data: {
          name: 'Frank'
        },
      });
    }
  }
}
