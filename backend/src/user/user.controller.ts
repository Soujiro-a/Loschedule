import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Role } from 'src/auth/role.decorator';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EditUserInput, EditUserOutput } from './dtos/edit-user.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    return this.userService.create(createUserInput);
  }

  @Get(':nickname')
  getProfile(@Param('nickname') nickname: string): Promise<UserProfileOutput> {
    return this.userService.getProfile(nickname);
  }

  @Post('/login')
  login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Patch()
  @Role(['any'])
  editProfile(
    @Req() request: Request,
    @Body() editUserInput: EditUserInput,
  ): Promise<EditUserOutput> {
    return this.userService.editProfile(request, editUserInput);
  }

  // me
}
