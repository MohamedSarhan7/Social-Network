import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class CreateLikeInput {
  @IsMongoId()
  @Field()
  postId: string;
}
