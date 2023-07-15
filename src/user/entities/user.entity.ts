import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  picture?: string;
  @Field(() => [Post], { nullable: true })
  posts: Post[];
  @Field(() => [User], { nullable: true })
  friends: User[];
}
