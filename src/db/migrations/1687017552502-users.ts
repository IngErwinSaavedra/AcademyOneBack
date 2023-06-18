/* eslint-disable prettier/prettier */
import { Table, MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class Users1687017552502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
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
                        name: 'username',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Nickname del usuario',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Contraseña del usuario',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Nombre del usuario',
                    },
                    {
                        name: 'names',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Nombre del usuario',
                    },
                    {
                        name: 'lastnames',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Apellidos del usuario',
                    },
                    {
                        name: 'active',
                        type: 'boolean',
                        isNullable: true,
                        comment: 'Estado del usuario verificación por email',
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                        isNullable: false,
                        comment: 'Rol Id',
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
                ],
            }),
            true,
        );
        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["roleId"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("roleId") !== -1,
        )
        await queryRunner.dropForeignKey("users", foreignKey)
        await queryRunner.dropColumn("users", "roleId")
        await queryRunner.dropTable("users")
    }

}
