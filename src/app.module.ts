import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestContextModule } from './request-context/request-context.module';

@Module({
  imports: [RequestContextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
