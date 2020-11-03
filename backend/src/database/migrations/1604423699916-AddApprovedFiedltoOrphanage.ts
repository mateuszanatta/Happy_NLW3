import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddApprovedFiedltoOrphanage1604423699916 implements MigrationInterface {
    name = 'AddApprovedFiedltoOrphanage1604423699916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("orphanages", new TableColumn({
            name: 'approved',
            type: 'true',
            default: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("orphanages", new TableColumn({
            name: 'approved',
            type: 'true',
            default: false,
        }));
    }

}
