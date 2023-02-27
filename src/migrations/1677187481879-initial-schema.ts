import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialSchema1677187481879 implements MigrationInterface {
    name = 'initialSchema1677187481879';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE "question_id_seq"`);
        await queryRunner.query(`CREATE SEQUENCE "temporary_question_id_seq"`);
        await queryRunner.query(`CREATE SEQUENCE "sheet_id_seq"`);
        await queryRunner.query(`CREATE SEQUENCE "temporary_sheet_id_seq"`);
        await queryRunner.query(`CREATE SEQUENCE "user_id_seq"`);
        await queryRunner.query(
            `CREATE TABLE "question" ("id" integer PRIMARY KEY DEFAULT nextval('question_id_seq') NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "content" varchar NOT NULL, "privacy" integer NOT NULL, "createdById" integer)`
        );
        await queryRunner.query(
            `CREATE TABLE "sheet" ("id" integer PRIMARY KEY DEFAULT nextval('sheet_id_seq') NOT NULL, "title" varchar NOT NULL, "subject" varchar NOT NULL, "description" varchar NOT NULL, "privacy" integer NOT NULL, "createdById" integer)`
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("id" integer PRIMARY KEY DEFAULT nextval('user_id_seq') NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "sheet_questions_question" ("sheetId" integer NOT NULL, "questionId" integer NOT NULL, PRIMARY KEY ("sheetId", "questionId"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_7cc8333d90dd4b60fb65f0f54d" ON "sheet_questions_question" ("sheetId") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c2ebae727ba7e5e17c7be874d1" ON "sheet_questions_question" ("questionId") `
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_question" ("id" integer PRIMARY KEY DEFAULT nextval('temporary_question_id_seq') NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "content" varchar NOT NULL, "privacy" integer NOT NULL, "createdById" integer, CONSTRAINT "FK_187915d8eaa010cde8b053b35d5" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_question"("id", "title", "description", "content", "privacy", "createdById") SELECT "id", "title", "description", "content", "privacy", "createdById" FROM "question"`
        );
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_question" RENAME TO "question"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_sheet" ("id" integer PRIMARY KEY DEFAULT nextval('temporary_sheet_id_seq') NOT NULL, "title" varchar NOT NULL, "subject" varchar NOT NULL, "description" varchar NOT NULL, "privacy" integer NOT NULL, "createdById" integer, CONSTRAINT "FK_e6a4433d6ccfce87c9cee67f32c" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_sheet"("id", "title", "subject", "description", "privacy", "createdById") SELECT "id", "title", "subject", "description", "privacy", "createdById" FROM "sheet"`
        );
        await queryRunner.query(`DROP TABLE "sheet"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_sheet" RENAME TO "sheet"`
        );
        await queryRunner.query(`DROP INDEX "IDX_7cc8333d90dd4b60fb65f0f54d"`);
        await queryRunner.query(`DROP INDEX "IDX_c2ebae727ba7e5e17c7be874d1"`);
        await queryRunner.query(
            `CREATE TABLE "temporary_sheet_questions_question" ("sheetId" integer NOT NULL, "questionId" integer NOT NULL, CONSTRAINT "FK_7cc8333d90dd4b60fb65f0f54d4" FOREIGN KEY ("sheetId") REFERENCES "sheet" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_c2ebae727ba7e5e17c7be874d13" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("sheetId", "questionId"))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_sheet_questions_question"("sheetId", "questionId") SELECT "sheetId", "questionId" FROM "sheet_questions_question"`
        );
        await queryRunner.query(`DROP TABLE "sheet_questions_question"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_sheet_questions_question" RENAME TO "sheet_questions_question"`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_7cc8333d90dd4b60fb65f0f54d" ON "sheet_questions_question" ("sheetId") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c2ebae727ba7e5e17c7be874d1" ON "sheet_questions_question" ("questionId") `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_c2ebae727ba7e5e17c7be874d1"`);
        await queryRunner.query(`DROP INDEX "IDX_7cc8333d90dd4b60fb65f0f54d"`);
        await queryRunner.query(
            `ALTER TABLE "sheet_questions_question" RENAME TO "temporary_sheet_questions_question"`
        );
        await queryRunner.query(
            `CREATE TABLE "sheet_questions_question" ("sheetId" integer NOT NULL, "questionId" integer NOT NULL, PRIMARY KEY ("sheetId", "questionId"))`
        );
        await queryRunner.query(
            `INSERT INTO "sheet_questions_question"("sheetId", "questionId") SELECT "sheetId", "questionId" FROM "temporary_sheet_questions_question"`
        );
        await queryRunner.query(
            `DROP TABLE "temporary_sheet_questions_question"`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c2ebae727ba7e5e17c7be874d1" ON "sheet_questions_question" ("questionId") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_7cc8333d90dd4b60fb65f0f54d" ON "sheet_questions_question" ("sheetId") `
        );
        await queryRunner.query(
            `ALTER TABLE "sheet" RENAME TO "temporary_sheet"`
        );
        await queryRunner.query(
            `CREATE TABLE "sheet" ("id" integer PRIMARY KEY DEFAULT nextval('sheet_id_seq') NOT NULL, "title" varchar NOT NULL, "subject" varchar NOT NULL, "description" varchar NOT NULL, "privacy" integer NOT NULL, "createdById" integer)`
        );
        await queryRunner.query(
            `INSERT INTO "sheet"("id", "title", "subject", "description", "privacy", "createdById") SELECT "id", "title", "subject", "description", "privacy", "createdById" FROM "temporary_sheet"`
        );
        await queryRunner.query(`DROP TABLE "temporary_sheet"`);
        await queryRunner.query(
            `ALTER TABLE "question" RENAME TO "temporary_question"`
        );
        await queryRunner.query(
            `CREATE TABLE "question" ("id" integer PRIMARY KEY DEFAULT nextval('question_id_seq') NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "content" varchar NOT NULL, "privacy" integer NOT NULL, "createdById" integer)`
        );
        await queryRunner.query(
            `INSERT INTO "question"("id", "title", "description", "content", "privacy", "createdById") SELECT "id", "title", "description", "content", "privacy", "createdById" FROM "temporary_question"`
        );
        await queryRunner.query(`DROP TABLE "temporary_question"`);
        await queryRunner.query(`DROP INDEX "IDX_c2ebae727ba7e5e17c7be874d1"`);
        await queryRunner.query(`DROP INDEX "IDX_7cc8333d90dd4b60fb65f0f54d"`);
        await queryRunner.query(`DROP TABLE "sheet_questions_question"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "sheet"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }
}
