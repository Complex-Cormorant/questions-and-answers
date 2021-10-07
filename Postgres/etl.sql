\copy public.questions from '~/questions.csv' DELIMITER ',' CSV HEADER;
\copy public.answers from '~/answers.csv' DELIMITER ',' CSV HEADER;
\copy public.photos from '~/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('questions_question_id_seq', (SELECT MAX(question_id) FROM questions));
SELECT setval('answers_answer_id_seq', (SELECT MAX(answer_id) FROM answers));
SELECT setval('photos_photo_id_seq', (SELECT MAX(photo_id) FROM photos));

CREATE INDEX questions_product_id on questions(product_id);
CREATE INDEX answers_question_id on answers(question_id);
CREATE INDEX photos_answer_id on photos(answer_id);
CREATE INDEX question_reported_idx on questions(reported) WHERE reported = false;
CREATE INDEX answer_reported_idx on answers(reported) WHERE reported = false;