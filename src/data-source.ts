import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
    type: process.env.DB_TYPE,
    url: process.env.DATABASE_URL,
    synchronize: false,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    entities: ['**/*.entity.ts'],
    migrations: [__dirname + '/migrations/*.ts'],
} as DataSourceOptions);
