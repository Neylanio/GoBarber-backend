import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AlterTimeZoneInAppointments1599592792650 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'created_at',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
      }),
    );

    await queryRunner.changeColumn(
      'appointments',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'created_at',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
      }),
    );

    await queryRunner.changeColumn(
      'appointments',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
      }),
    );
  }

}
