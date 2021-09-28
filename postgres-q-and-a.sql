CREATE TABLE products(
  product_id BIGSERIAL NOT NULL PRIMARY KEY
);

CREATE TABLE questions(
  question_id BIGSERIAL NOT NULL PRIMARY KEY,
  question_body VARCHAR(1000) TEXT NOT NULL,
  question_date DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  question_helpfulness SMALLINT DEFAULT 0,
  reported BOOLEAN NOT NULL,
  email STRING NOT NULL,
  product_id BIGINT NOT NULL REFERENCES products (product_id)
 );

 CREATE TABLE answers(
  answers_id BIGSERIAL NOT NULL PRIMARY KEY,
  answer_body VARCHAR(1000) NOT NULL,
  date DATE NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  helpfulness SMALLINT DEFAULT 0,
  reported BOOLEAN NOT NULL,
  email STRING NOT NULL,
  question_id BIGINT NOT NULL REFERENCES questions (question_id)
 );

 CREATE TABLE photos(
  photo_id BIGSERIAL NOT NULL PRIMARY KEY,
  url TEXT,
  answer_id BIGINT NOT NULL REFERENCES answers (answer_id)
)