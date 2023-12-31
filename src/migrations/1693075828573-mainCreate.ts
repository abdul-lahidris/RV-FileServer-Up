import { MigrationInterface, QueryRunner } from "typeorm";

export class MainCreate1693075828573 implements MigrationInterface {
    name = 'MainCreate1693075828573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "verified" boolean NOT NULL DEFAULT false, "verificationCode" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "verificationCode_index" ON "users" ("verificationCode") `);
        await queryRunner.query(`CREATE TABLE "folders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "path" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_8578bd31b0e7f6d6c2480dbbca8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "folder_name_index" ON "folders" ("name") `);
        await queryRunner.query(`CREATE TABLE "userFiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "url" character varying NOT NULL, "userId" uuid NOT NULL, "folderId" uuid NOT NULL, "isUnsafe" boolean NOT NULL DEFAULT false, "deleted" boolean NOT NULL DEFAULT false, "deleteApprovalCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_5d4f5fbae0398fa2ec6c571360c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "file_name_index" ON "userFiles" ("name") `);
        await queryRunner.query(`CREATE TABLE "file_approval" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fileId" character varying NOT NULL, "userId" uuid NOT NULL, "approvalNumber" integer NOT NULL, CONSTRAINT "PK_2d0f1905156fbea9eef90e9f270" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."file_history_actiontype_enum" AS ENUM('upload', 'rename', 'copy', 'move', 'delete', 'marked_unsafe')`);
        await queryRunner.query(`CREATE TABLE "file_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fileId" character varying NOT NULL, "userId" uuid NOT NULL, "actionType" "public"."file_history_actiontype_enum" NOT NULL, "remark" character varying NOT NULL, CONSTRAINT "PK_0deb31e450cde5a323d8af4aa3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refreshTokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, "createdByIp" character varying NOT NULL, "revoked" TIMESTAMP NOT NULL, "replacedByToken" character varying NOT NULL, CONSTRAINT "PK_c4a0078b846c2c4508473680625" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "folders" ADD CONSTRAINT "FK_5caa05c855e82b975c8c438cf68" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "userFiles" ADD CONSTRAINT "FK_8b8c33bbcb8d4295a9e95269b00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "userFiles" ADD CONSTRAINT "FK_389108e51b44d8355830ef8f497" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "file_approval" ADD CONSTRAINT "FK_02465205fc7d1c54151bacb33d3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "file_history" ADD CONSTRAINT "FK_91e2cfd61ce4217c4f267f6314d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_history" DROP CONSTRAINT "FK_91e2cfd61ce4217c4f267f6314d"`);
        await queryRunner.query(`ALTER TABLE "file_approval" DROP CONSTRAINT "FK_02465205fc7d1c54151bacb33d3"`);
        await queryRunner.query(`ALTER TABLE "userFiles" DROP CONSTRAINT "FK_389108e51b44d8355830ef8f497"`);
        await queryRunner.query(`ALTER TABLE "userFiles" DROP CONSTRAINT "FK_8b8c33bbcb8d4295a9e95269b00"`);
        await queryRunner.query(`ALTER TABLE "folders" DROP CONSTRAINT "FK_5caa05c855e82b975c8c438cf68"`);
        await queryRunner.query(`DROP TABLE "refreshTokens"`);
        await queryRunner.query(`DROP TABLE "file_history"`);
        await queryRunner.query(`DROP TYPE "public"."file_history_actiontype_enum"`);
        await queryRunner.query(`DROP TABLE "file_approval"`);
        await queryRunner.query(`DROP INDEX "public"."file_name_index"`);
        await queryRunner.query(`DROP TABLE "userFiles"`);
        await queryRunner.query(`DROP INDEX "public"."folder_name_index"`);
        await queryRunner.query(`DROP TABLE "folders"`);
        await queryRunner.query(`DROP INDEX "public"."verificationCode_index"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
