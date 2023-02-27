import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
    type: configService.get('DB_TYPE'),
    url: configService.get('DATABASE_URL'),
    username: configService.get('DB_USER'),
    database: configService.get('DB_NAME'),
    entities: ['**/*.entity.ts'],
    migrations: [__dirname + '/migrations/*.ts'],
} as DataSourceOptions);
