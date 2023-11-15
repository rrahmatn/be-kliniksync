import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const GetUser = createParamDecorator( 
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      console.log(data)
      return request.user[data];
    }
    console.log(request.user)
    return request.user;
  },
);
