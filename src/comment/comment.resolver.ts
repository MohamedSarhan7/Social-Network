import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { AuthUser } from 'src/common/decorators';
import { JwtPayload } from 'src/auth/types';
import { AtGuard } from '../common/guards/at.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AtGuard)
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @AuthUser() user: JwtPayload,
  ): Promise<Comment> {
    return this.commentService.create(createCommentInput, user);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @AuthUser() user: JwtPayload,
  ) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
      user,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id') id: string, @AuthUser() user: JwtPayload) {
    return this.commentService.remove(id, user);
  }

  @ResolveField(() => User)
  user(@Parent() comment: Comment): Promise<User> {
    return this.commentService.getUser(comment);
  }
}
