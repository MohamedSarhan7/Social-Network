import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
//  remove like module
// add and remove like to post module
@ObjectType()
export class Like {
  @Field()
  id: string;

  @Field()
  userId: string;
  @Field(() => User)
  user: User;
  @Field()
  postId: string;

  @Field(() => Int, { nullable: true })
  totalLikes: number;
}
