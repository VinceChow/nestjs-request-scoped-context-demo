import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestContextModule } from './request-context/request-context.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RequestContextModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
