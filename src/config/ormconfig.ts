import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
    /* do nothing */
}
let source;
try {
    source = new DataSource({
        type: 'postgres' as any,
        database: process.env.TYPEORM_DATABASE,
        port: parseInt(process.env.TYPEORM_PORT) || 5432,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        host: process.env.TYPEORM_HOST,
        // entities: ['src/**/*.entity.ts'],
        migrationsTableName: 'migrations',
        migrations: ['src/db/migrations/*.ts'],
    });
    console.log(source);
} catch (error) { }
export default source;