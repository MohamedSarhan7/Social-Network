import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
