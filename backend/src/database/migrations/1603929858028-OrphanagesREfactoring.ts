import {MigrationInterface, QueryRunner} from "typeorm";

export class OrphanagesREfactoring1603929858028 implements MigrationInterface {
    name = 'OrphanagesREfactoring1603929858028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE orphanages ADD COLUMN "whatsapp" varchar`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE orphanages DROP COLUMN "whatsapp"`);
    }

}
