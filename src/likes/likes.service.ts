import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto, UpdateLikeDto } from './dto';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from 'src/post/post.service';
import { User } from '@prisma/client';
@Injectable()
export class LikesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
  ) {}
  async create(createLikeDto: CreateLikeDto, user: JwtPayload) {
    const like = await this.prismaService.likes.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: createLikeDto.postId,
        },
      },
    });
    if (like) throw new BadRequestException();
    await this.prismaService.likes.create({
      data: { postId: createLikeDto.postId, userId: user.id },
    });
    return '';
  }

  async update(updateLikeInput: UpdateLikeDto, user: JwtPayload) {
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
}
