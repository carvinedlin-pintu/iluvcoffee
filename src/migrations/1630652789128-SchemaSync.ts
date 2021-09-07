import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1630652789128 implements MigrationInterface {
    name = 'SchemaSync1630652789128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "payload" json NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b535fbe8ec6d832dde22065ebd" ON "event" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_6e1de41532ad6af403d3ceb4f2" ON "event" ("name", "type") `);
        await queryRunner.query(`ALTER TABLE "public"."coffee" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "public"."coffee" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."coffee" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."coffee" ADD "recommendations" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."coffee" DROP COLUMN "recommendations"`);
        await queryRunner.query(`ALTER TABLE "public"."coffee" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "public"."coffee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."coffee" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_6e1de41532ad6af403d3ceb4f2"`);
        await queryRunner.query(`DROP INDEX "IDX_b535fbe8ec6d832dde22065ebd"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
