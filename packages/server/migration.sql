-- CreateTable
CREATE TABLE "cards" (
    "card_id" SERIAL NOT NULL,
    "technology" VARCHAR(255) NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" VARCHAR(255) NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "rate_card" (
    "user_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "rate_card_pkey" PRIMARY KEY ("user_id","card_id")
);

-- CreateTable
CREATE TABLE "type" (
    "technology_id" SERIAL NOT NULL,
    "type_card" TEXT,

    CONSTRAINT "type_pkey" PRIMARY KEY ("technology_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "rate_card" ADD CONSTRAINT "rate_card_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("card_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rate_card" ADD CONSTRAINT "rate_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO users (username, password, email) VALUES ('Adamek', 'admin123', 'adamcek8@gmail.com'),('Martyna', 'admin12', 'martyna@gmail.com'), ('Dorota', 'dor123', 'dor@wp.pl');
