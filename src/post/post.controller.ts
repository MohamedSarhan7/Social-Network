import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { JwtPayload } from 'src/auth/types';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/decorators';
import { Post as PostModel, Comment } from '@prisma/client';

@Controller('posts')
@UseGuards(AuthGuard('jwt')) // Assuming you're using JWT authentication
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @AuthUser() user: JwtPayload,
  ): Promise<PostModel> {
    {
      return this.postService.create(user, createPostDto);
    }
  }
  @Get()
  findAll(): Promise<PostModel[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostModel> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @AuthUser() user: JwtPayload,
  ): Promise<PostModel> {
    return this.postService.update(id, updatePostDto, user);
  }

  @Delete(':id')
  removePost(
    @Param('id') id: number,
    @AuthUser() user: JwtPayload,
  ): Promise<any> {
    return this.postService.remove(id, user);
  }

  // Endpoint for getting total likes of a post
  @Get(':id/likes')
  getTotalLikes(@Param('id') id: number): Promise<number> {
    return this.postService.getTotalLikes(id);
  }

  // Endpoint for getting comments of a post
  @Get(':id/comments')
  getComments(@Param('id') id: number): Promise<Comment[]> {
    return this.postService.getComments(id);
  }
}
