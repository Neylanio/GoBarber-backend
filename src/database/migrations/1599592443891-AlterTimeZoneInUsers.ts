import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AlterTimeZoneInUsers1599592443891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn(
        'users',
        'created_at',
        new TableColumn({
          name: 'created_at',
          type: 'timestamp with time zone',
        }),
      );

      await queryRunner.changeColumn(
        'users',
        'updated_at',
        new TableColumn({
          name: 'updated_at',
          type: 'timestamp with time zone',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn(
        'users',
        'created_at',
        new TableColumn({
          name: 'created_at',
          type: 'timestamp',
        }),
      );

      await queryRunner.changeColumn(
        'users',
        'updated_at',
        new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
        }),
      );
    }

}
