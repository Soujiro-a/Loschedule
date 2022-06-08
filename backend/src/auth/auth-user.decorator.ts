import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { _id, nickname, role, characters, teams } = request.user;
    return {
      _id,
      nickname,
      role,
      characters,
      teams,
    };
  },
);
