import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RtGuard extends AuthGuard('refresh-jwt') {
  constructor() {
    super();
  }

  getRequest<T = any>(context: ExecutionContext): T {
    const httpContext = context.switchToHttp();
    return httpContext.getRequest();
  }
}
