import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './publicAuth';
import { JWT_ISS, verify, EXPIRES_TIME, JWT_SECRET_KEY } from './jwtAuth';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly cls: ClsService,
        private reflector: Reflector,
    ) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // 读取元数据
        // 不需要校验的
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const { authorization } = request.headers;
        // 校验jwt
        const jwtRes = verify({
            token: authorization,
            secretKey: JWT_SECRET_KEY,
            expiresIn: EXPIRES_TIME,
        });
        if (jwtRes.iss !== JWT_ISS) {
            // 校验失败
            response.send({
                code: 403,
                message: 'fail',
                subCode: 'NEED_LOGIN',
            });
            return false;
        }
        const { code } = jwtRes;
        this.cls.set('openUid', code);
        return true;
    }
}
