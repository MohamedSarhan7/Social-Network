import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  postId: string;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;
  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
