import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPasswordREcover1604316811734 implements MigrationInterface {
    name = 'AddPasswordREcover1604316811734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("users", 
            [
                new TableColumn(
                {
                    name: 'password_reset_token',
                    type: 'varchar',
                    isNullable: true,
                    default: null,
                }),
                new TableColumn(
                {
                    name: 'password_reset_expires',
                    type: 'date',
                    isNullable: true,
                    default: null,
                })
            ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("users", 
            [
                new TableColumn(
                {
                    name: 'password_reset_token',
                    type: 'varchar',
                    isNullable: true,
                    default: null,
                }),
                new TableColumn(
                {
                    name: 'password_reset_expires',
                    type: 'date',
                    isNullable: true,
                    default: null,
                })
            ]);
    }

}
