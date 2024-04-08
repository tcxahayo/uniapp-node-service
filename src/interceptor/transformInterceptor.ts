import {
    CallHandler,
    ExecutionContext,
    HttpCode,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();
        return next.handle().pipe(
            map((data) => {
                if (res.statusCode === HttpStatus.CREATED) {
                    res.status(HttpStatus.OK);
                }
                return {
                    data,
                    code: 200,
                };
            }),
        );
    }
}
