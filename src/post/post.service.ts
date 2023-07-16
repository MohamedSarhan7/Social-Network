import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    user: JwtPayload,
    createPostInput: CreatePostInput,
  ): Promise<Post> {
    const post = await this.prismaService.post.create({
      data: { ...createPostInput, userId: user.id },
    });
    console.log(post);
    return new Post(post);
  }

  async getUser(post: Post): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: post.userId },
    });
    return new User(user);
  }

  async getComments(post: Post): Promise<Comment[]> {
    const comments = (
      await this.prismaService.comment.findMany({
        where: { postId: post.id },
      })
    ).map((comment) => new Comment(comment));
    return comments;
  }
  async findAll() {
    const posts = (await this.prismaService.post.findMany()).map(
      (post) => new Post(post),
    );
    return posts;
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });
    if (!post) throw new NotFoundException('no such comment with this id');
    return new Post(post);
  }

  async update(
    id: string,
    updatePostInput: UpdatePostInput,
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
    return new Post(updatedPost);
  }

  async remove(id: string, user: JwtPayload) {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('no such post with this id');
    if (post.userId !== user.id) {
      throw new ForbiddenException('forbidden action');
    }
    await this.prismaService.post.delete({ where: { id } });
    return '';
    // return `This action removes a #${id} post`;
  }
}
