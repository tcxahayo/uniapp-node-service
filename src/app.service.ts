import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  // constructor(
  //   @Inject('APP_REPOSITORY')
  //   private userRepository: Repository<User>,
  // ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<string> {
    return '222';
  }
}
