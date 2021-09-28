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
  photos VARCHAR [],
  question_id BIGINT NOT NULL REFERENCES questions (question_id)
 );