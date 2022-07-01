import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EditUserInput, EditUserOutput } from './dtos/edit-user.dto';
import { searchNicknameOutput } from './dtos/search-by-nickname.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './schemas/user.schema';
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
    @AuthUser() user: User,
    @Body() editUserInput: EditUserInput,
  ): Promise<EditUserOutput> {
    return this.userService.editProfile(user, editUserInput);
  }

  @Get()
  @Role(['any'])
  me(@AuthUser() user: User) {
    return user;
  }

  @Get('/search/:nickname')
  searchNickname(
    @Param('nickname') nickname: string,
  ): Promise<searchNicknameOutput> {
    return this.userService.searchNickname(nickname);
  }
}
