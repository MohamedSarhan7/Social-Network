import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Int,
} from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/common/guards';
import { AuthUser } from 'src/common/decorators';
import { JwtPayload } from 'src/auth/types';
import { Like } from './entities/like.entity';
// import { User } from 'src/user/entities/user.entity';

@UseGuards(AtGuard)
@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @Mutation(() => Like)
  likePost(
    @Args('createLikeInput') createLikeInput: CreateLikeInput,
    @AuthUser() user: JwtPayload,
  ) {
    return this.likesService.create(createLikeInput, user);
  }

  @Mutation(() => Like)
  unlikePost(
    @Args('updateLikeInput') updateLikeInput: UpdateLikeInput,
    @AuthUser() user: JwtPayload,
  ) {
    return this.likesService.update(updateLikeInput, user);
  }
  @ResolveField(() => Int)
  totalLikes(@Parent() like: Like): Promise<number> {
    console.log(like);
    return this.likesService.getTotalLikes(like.id);
  }
  // @ResolveField(() => Int)
  // user(@Parent() like: Like): Promise<User> {
  //   console.log(like);
  //   return this.likesService.getUser(like.userId);
  // }
}
