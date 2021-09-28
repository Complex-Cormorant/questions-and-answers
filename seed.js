const db = require('./index.js');
const { Question, Answer }= require('./Blog.js');

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