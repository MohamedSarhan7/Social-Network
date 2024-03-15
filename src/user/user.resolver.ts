import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '../common/guards/at.guard';

import { AuthUser } from '../common/decorators/user.decorator';
import { JwtPayload } from 'src/auth/types';

@UseGuards(AtGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AtGuard)
  @Query(() => [User], { name: 'users' })
  findAll(@AuthUser() user: JwtPayload) {
    console.log(user);
    return this.userService.findAll();
  }

  @UseGuards(AtGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string) {
    return this.userService.findOne(username);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.remove(id);
  // }
}
