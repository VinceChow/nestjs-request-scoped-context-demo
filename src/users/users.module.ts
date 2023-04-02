import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestContextModule } from 'src/request-context/request-context.module';
import { UsersController } from './users.controller';

@Module({
  imports: [RequestContextModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
