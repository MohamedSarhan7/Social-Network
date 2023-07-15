import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  picture?: string;

  @Field()
  atToken: string;

  @Field()
  rtToken: string;

  constructor(partial: Partial<AuthResponse>) {
    Object.assign(this, partial);
  }
}
