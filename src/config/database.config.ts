import * as path from 'path';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

const logger = new Logger('Config');
const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
    /* do nothing */
}
let DatabaseConfig;

try {
    DatabaseConfig = {
        type: 'postgres' as any,
        database: process.env.TYPEORM_DATABASE,
        port: parseInt(process.env.TYPEORM_PORT) || 5432,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        host: process.env.TYPEORM_HOST,
        synchronize: false,
        migrationsRun: false,
        entities: [__dirname + './**/**/*entity{.ts,.js}'],
        autoLoadEntities: true,
        migrationsTableName: 'migrations',
    };
    console.log(DatabaseConfig);
} catch (error) {
    logger.log(error);
}
export default DatabaseConfig;
