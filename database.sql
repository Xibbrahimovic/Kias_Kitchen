
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "recipes" (
	"id" serial NOT NULL,
	"image" varchar(1000) NOT NULL,
	"name" varchar(255) NOT NULL,
	"time" int NOT NULL,
	"overview" TEXT NOT NULL,
	"ingredients" TEXT NOT NULL,
	"instructions" TEXT NOT NULL,
	"user_id" int NOT NULL,
	CONSTRAINT "recipes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favorites" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"recipe_id" int NOT NULL,
	CONSTRAINT "favorites_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ratings" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"recipes_id" int NOT NULL,
	"rating" int NOT NULL,
	"review" TEXT NOT NULL,
	CONSTRAINT "ratings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "recipes" ADD CONSTRAINT "recipes_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk1" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id");

ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk1" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id");




