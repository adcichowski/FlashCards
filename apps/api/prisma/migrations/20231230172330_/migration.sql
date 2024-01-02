-- CreateEnum
CREATE TYPE "difficulties" AS ENUM ('Junior', 'Mid', 'Senior');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(255),
    "answer" VARCHAR(255),
    "userId" INTEGER NOT NULL,
    "difficulties" "difficulties" NOT NULL,
    "shape" INTEGER,
    "subject" VARCHAR(16),

    CONSTRAINT "card_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "userId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "rate_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "name" VARCHAR(16) NOT NULL,

    CONSTRAINT "section_pk" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Shape" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "shape_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" VARCHAR(16) NOT NULL,
    "section" VARCHAR(16) NOT NULL,

    CONSTRAINT "subject_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "email" VARCHAR(32) NOT NULL,
    "password" VARCHAR(60) NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_id_uindex" ON "Card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "subject_subject_uindex" ON "Subject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_uindex" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_uindex" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_uindex" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_uindex" ON "User"("password");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "card_shape_shape_fk" FOREIGN KEY ("shape") REFERENCES "Shape"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "card_subject_name_fk" FOREIGN KEY ("subject") REFERENCES "Subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "cards_users_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "rate_card_id_fk" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "rate_users_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "subject_section_name_fk" FOREIGN KEY ("section") REFERENCES "Section"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;
