import { Injectable } from '@nestjs/common';
import { RequestContextService } from 'src/request-context/request-context.service';

@Injectable()
export class UsersService {
  constructor(private requestContextService: RequestContextService) {}

  getUserToken(): string {
    return this.requestContextService.get<string>('userToken');
  }

  // Add other service methods that require request data
}
