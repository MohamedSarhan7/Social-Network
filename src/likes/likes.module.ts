import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { PostService } from 'src/post/post.service';

@Module({
  providers: [LikesResolver, LikesService, PostService],
})
export class LikesModule {}
