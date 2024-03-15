import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @Field(() => Int, { nullable: true })
  likes: number;

  @Field(() => User)
  user: User;

  @Field()
  userId: string;

  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }
}
