import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(context);
    const request = gqlCtx.getContext().req;
    return request.user;
  },
);
