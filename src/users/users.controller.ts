import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { UserGuard } from './user.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(UserGuard)
  @ApiHeader({
    name: 'x-access-token',
    required: true,
  })
  getToken(): string {
    return this.usersService.getUserToken();
  }
}
