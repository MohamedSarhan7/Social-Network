import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  picture?: string;
}
