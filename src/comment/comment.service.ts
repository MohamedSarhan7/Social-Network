import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCommentInput: CreateCommentInput,
    user: JwtPayload,
  ): Promise<Comment> {
    const post = await this.prismaService.post.findUnique({
      where: { id: createCommentInput.postId },
    });
    if (!post) throw new NotFoundException('no such post with this id');
    const comment = await this.prismaService.comment.create({
      data: {
        content: createCommentInput.content,
        postId: createCommentInput.postId,
        userId: user.id,
      },
    });
    return new Comment(comment);
  }

  async findAll(): Promise<Comment[]> {
    const comments = (await this.prismaService.comment.findMany()).map(
      (comment) => new Comment(comment),
    );
    return comments;
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException('no such comment with this id');
    return new Comment(comment);
  }

  async update(
    id: string,
    updateCommentInput: UpdateCommentInput,
    user: JwtPayload,
  ): Promise<Comment> {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException('no such comment with this id');
    if (comment.userId !== user.id) {
      throw new ForbiddenException('forbidden Action');
    }
    const updatedComment = await this.prismaService.comment.update({
      where: { id },
      data: { content: updateCommentInput.content },
    });
    return new Comment(updatedComment);
  }

  async remove(id: string, user: JwtPayload) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException('no such comment with this id');
    if (comment.userId !== user.id) {
      throw new ForbiddenException('forbidden action');
    }
    await this.prismaService.comment.delete({ where: { id } });
    return '';
  }
  async getUser(comment: Comment): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: comment.userId },
    });
    return new User(user);
  }
}
