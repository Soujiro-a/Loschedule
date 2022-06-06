import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Role } from 'src/auth/role.decorator';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Role(['any'])
  create(@Body() createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    return this.userService.create(createUserInput);
  }

  @Get(':id')
  @Role(['user'])
  getProfile(@Param('id') userId: string): Promise<UserProfileOutput> {
    return this.userService.getProfile(userId);
  }

  @Post('/login')
  @Role(['any'])
  login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }
  // edit Profile
}
