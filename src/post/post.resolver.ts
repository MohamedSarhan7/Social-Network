import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Int,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '../common/guards/at.guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { JwtPayload } from 'src/auth/types';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@UseGuards(AtGuard)
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @AuthUser() user: JwtPayload,
  ): Promise<Post> {
    console.log(user);
    return this.postService.create(user, createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @AuthUser() user: JwtPayload,
  ) {
    return this.postService.update(updatePostInput.id, updatePostInput, user);
  }

  @Mutation(() => Post)
  removePost(@Args('id') id: string, @AuthUser() user: JwtPayload) {
    return this.postService.remove(id, user);
  }
  @ResolveField(() => User)
  user(@Parent() post: Post): Promise<User> {
    return this.postService.getUser(post);
  }
  @ResolveField(() => Int)
  likes(@Parent() post: Post): Promise<number> {
    return this.postService.getTotalLikes(post.id);
  }
  @ResolveField(() => [Comment])
  comments(@Parent() post: Post): Promise<Comment[]> {
    return this.postService.getComments(post.id);
  }
}
