import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
  ) {}
  async create(createLikeInput: CreateLikeInput, user: JwtPayload) {
    const like = await this.prismaService.likes.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: createLikeInput.postId,
        },
      },
    });
    if (like) throw new BadRequestException();
    await this.prismaService.likes.create({
      data: { postId: createLikeInput.postId, userId: user.id },
    });
    return '';
  }

  async update(updateLikeInput: UpdateLikeInput, user: JwtPayload) {
    // const like = await this.prismaService.likes.findUnique({
    //   where: {
    //     userId_postId: {
    //       userId: user.id,
    //       postId: updateLikeInput.postId,
    //     },
    //   },
    // });
    // if (!like) throw new BadRequestException();
    await this.prismaService.likes.delete({
      where: {
        userId_postId: { userId: user.id, postId: updateLikeInput.postId },
      },
    });
    return `This action updates a  like`;
  }
  async getTotalLikes(id: string) {
    const like = await this.prismaService.likes.findUnique({ where: { id } });
    return await this.postService.getTotalLikes(like.postId);
  }

  async getUser(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }
}
