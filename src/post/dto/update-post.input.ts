import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @IsMongoId()
  @Field()
  id: string;
}
