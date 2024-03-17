import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtPayload } from 'src/auth/types';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/decorators';

@Controller({ version: '1', path: 'users' })
@UseGuards(AuthGuard('jwt')) // Assuming you're using JWT authentication
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@AuthUser() user: JwtPayload) {
    console.log(user);
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  // @Put(':id')
  // updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // removeUser(@Param('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
