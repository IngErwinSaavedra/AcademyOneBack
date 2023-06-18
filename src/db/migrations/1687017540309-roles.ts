/* eslint-disable prettier/prettier */
import { Table, MigrationInterface, QueryRunner } from "typeorm"

export class Roles1687017540309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'int4',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        comment: 'Id llave primaria',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Nombre del rol',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Descripcion del rol',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: true,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE roles`);
    }

}
