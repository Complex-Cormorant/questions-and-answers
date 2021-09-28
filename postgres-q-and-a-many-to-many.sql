CREATE TABLE questions(
  question_id BIGSERIAL NOT NULL PRIMARY KEY,
  question_body VARCHAR(1000) TEXT NOT NULL,
  question_date DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  helpfulness SMALLINT DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT false,
  email VARCHAR(60) NOT NULL,
  product_id BIGINT NOT NULL
 );

CREATE TABLE answers(
  answers_id BIGSERIAL NOT NULL PRIMARY KEY,
  answer_body VARCHAR(1000) NOT NULL,
  answer_date DATE NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  helpfulness SMALLINT DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT false,
  email VARCHAR(60) NOT NULL,
  question_id BIGINT NOT NULL REFERENCES questions (question_id)
 );

CREATE TABLE photos(
  photo_id BIGSERIAL NOT NULL PRIMARY KEY,
  photo_url TEXT UNIQUE
)

CREATE TABLE answers_photos(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  photo_id BIGINT NOT NULL REFERENCES photos (photo_id),
  answer_id BIGINT NOT NULL REFERENCES answers (answer_id)
)
