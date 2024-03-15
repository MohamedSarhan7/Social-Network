import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    return httpContext.getRequest();
  }

  // Optionally, if you have custom logic that needs to be executed for each request:
  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);

  //   if (isPublic) {
  //     return true;
  //   }

  //   return super.canActivate(context);
  // }
}
