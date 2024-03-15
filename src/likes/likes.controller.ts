import { Controller, Post, Patch, UseGuards, Body } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtPayload } from 'src/auth/types';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/decorators';

@Controller('likes')
@UseGuards(AuthGuard('jwt')) // Assuming you're using JWT authentication
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  likePost(@Body() createLikeDto: CreateLikeDto, @AuthUser() user: JwtPayload) {
    return this.likesService.create(createLikeDto, user);
  }

  @Patch()
  unlikePost(
    @Body() updateLikeDto: UpdateLikeDto,
    @AuthUser() user: JwtPayload,
  ) {
    return this.likesService.update(updateLikeDto, user);
  }
}
