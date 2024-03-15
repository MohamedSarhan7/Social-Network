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
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { JwtPayload } from 'src/auth/types';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/decorators';
import { Comment } from '@prisma/client';
@Controller('comments')
@UseGuards(AuthGuard('jwt')) // Assuming you're using JWT authentication
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @AuthUser() user: JwtPayload,
  ): Promise<Comment> {
    return this.commentService.create(createCommentDto, user);
  }

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @AuthUser() user: JwtPayload,
  ): Promise<Comment> {
    return this.commentService.update(id, updateCommentDto, user);
  }

  @Delete(':id')
  removeComment(
    @Param('id') id: number,
    @AuthUser() user: JwtPayload,
  ): Promise<any> {
    return this.commentService.remove(id, user);
  }
}
