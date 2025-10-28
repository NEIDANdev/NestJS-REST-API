import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToBooks1761585058501 implements MigrationInterface {
  name = 'AddUserIdToBooks1761585058501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" ADD "userId" integer`);

    // 2️⃣Backfill 
    await queryRunner.query(`UPDATE "book" SET "userId" = 1 WHERE "userId" IS NULL`);

    // 3️⃣ Add the foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "book"
      ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693"
      FOREIGN KEY ("userId") REFERENCES "user"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // 4️⃣ (Optional) If you’ve backfilled, make it NOT NULL now
    await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "userId" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "book" DROP CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693"
    `);
    await queryRunner.query(`
      ALTER TABLE "book" DROP COLUMN "userId"
    `);
  }
}
