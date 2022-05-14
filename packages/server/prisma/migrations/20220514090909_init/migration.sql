-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "shapeId" INTEGER NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "userId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "rate_card_pkey" PRIMARY KEY ("userId","cardId")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(22) NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "technologies_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "createdOn" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shape" (
    "shapeId" INTEGER NOT NULL,

    CONSTRAINT "shape_pk" PRIMARY KEY ("shapeId")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "section_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "cards_subject_subject_id_fk" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "card_user_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "card_shape_shapeid_fk" FOREIGN KEY ("shapeId") REFERENCES "Shape"("shapeId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "rate_card_card_id_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "rate_card_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "subject_section_id_fk" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
