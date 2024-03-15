import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  content: string;

  @IsMongoId()
  @Field()
  postId: string;
}
