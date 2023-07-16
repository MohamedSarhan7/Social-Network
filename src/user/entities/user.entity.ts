import { ObjectType, Field } from '@nestjs/graphql';
// import { Exclude } from 'class-transformer';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field()
  id: string;
  @Field()
  username: string;

  // @Exclude()
  // @Field()
  // password: string;
  @Field({ nullable: true })
  picture?: string;
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
  @Field(() => [User], { nullable: true })
  friends?: User[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
