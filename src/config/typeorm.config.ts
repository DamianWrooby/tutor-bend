import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.configService.get<any>('DB_TYPE'),
            url: this.configService.get<string>('DATABASE_URL'),
            synchronize: false,
            database: this.configService.get<string>('DB_NAME'),
            autoLoadEntities: true,
            ssl: {
                rejectUnauthorized: false,
            },
        };
    }
}
