import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RtGuard extends AuthGuard('refresh-jwt') {
  constructor() {
    super();
  }

  getRequest<T = any>(context: ExecutionContext): T {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
