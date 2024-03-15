import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PostService } from 'src/post/post.service';

@Module({
  providers: [LikesService, PostService],
  controllers: [LikesController],
})
export class LikesModule {}
