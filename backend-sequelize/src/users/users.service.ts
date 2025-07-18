import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  
  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async seed() {
    const users = await this.userModel.findAll();
    if (users.length === 0) {
      await this.userModel.create({ name: 'Frank' });
    }
  }
}
