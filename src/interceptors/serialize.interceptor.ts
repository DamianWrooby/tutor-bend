import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { UseInterceptors } from '@nestjs/common/decorators';

export function Serialize<T>(dto: ClassConstructor<T>) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<T> {
        return handler.handle().pipe(
            map((data: T) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            })
        );
    }
}
