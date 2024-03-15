import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Comment, User } from '@prisma/client';
@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    user: JwtPayload,
    createPostInput: CreatePostDto,
  ): Promise<Post> {
    const post = await this.prismaService.post.create({
      data: { ...createPostInput, userId: user.id },
    });
    console.log(post);
    return post;
  }

  async getUser(post: Post): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: post.userId },
    });
    return user;
  }

  async getComments(postId: number): Promise<Comment[]> {
    const comments = await this.prismaService.comment.findMany({
      where: { postId },
    });

    return comments;
  }
  async findAll() {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });
    if (!post) throw new NotFoundException('no such comment with this id');
    return post;
  }

  async update(
    id: number,
    updatePostInput: UpdatePostDto,
    user: JwtPayload,
  ): Promise<Post> {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('no such post with this id');
    if (post.userId !== user.id) {
      throw new ForbiddenException('forbidden action');
    }
    const updatedPost = await this.prismaService.post.update({
      where: { id },
      data: { content: updatePostInput.content },
    });
    return updatedPost;
  }

  async remove(id: number, user: JwtPayload) {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('no such post with this id');
    if (post.userId !== user.id) {
      throw new ForbiddenException('forbidden action');
    }
    await this.prismaService.post.delete({ where: { id } });
    return '';
    // return `This action removes a #${id} post`;
  }
  async getTotalLikes(postId: number): Promise<number> {
    const likes = await this.prismaService.likes.count({
      where: { postId },
      // distinct: ['userId'],
    });
    console.log(postId);
    console.log(likes);
    return likes;
  }
}
