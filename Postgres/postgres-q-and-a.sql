CREATE TABLE questions(
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpfulness SMALLINT DEFAULT 0
);

CREATE TABLE answers(
  answers_id SERIAL NOT NULL PRIMARY KEY,
  question_id INT NOT NULL REFERENCES questions (question_id),
  answer_body VARCHAR(1000) NOT NULL,
  answer_date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT false,
  helpfulness SMALLINT DEFAULT 0
);

CREATE TABLE photos(
  photos_id SERIAL NOT NULL PRIMARY KEY,
  answer_id INT NOT NULL REFERENCES answers (answers_id),
  photo_url VARCHAR(2083) NOT NULL
);

