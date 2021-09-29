const db = require('./index.js');
const { Question, Answer }= require('./mongo-q-and-a.js');

const samplePosts = [
  {
    question_body: 'Hello'
  }
];

const insertSampleBlogs = function() {
  Question.create(samplePosts)
    .then(() => db.close());
};

insertSampleBlogs();