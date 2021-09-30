\copy public.questions from '~/questions.csv' DELIMITER ',' CSV HEADER;
\copy public.answers from '~/answers.csv' DELIMITER ',' CSV HEADER;
\copy public.photos from '~/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('questions_question_id_seq', (SELECT MAX(question_id) FROM questions));
SELECT setval('answers_answer_id_seq', (SELECT MAX(answer_id) FROM answers));
SELECT setval('photos_photo_id_seq', (SELECT MAX(photo_id) FROM photos));