const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

// const photoSchema = new mongoose.Schema(
//   {
//   photo_id: { type: Number, unique: true }
//   photo_url: String
//   }
// )

const answerSchema = new mongoose.Schema(
  {
  answer_id: { type: Number, unique: true },
  answer_body: String,
  answerer_name: String,
  helpfulness: Number,
  reported: Boolean,
  question_id: Number,
  email: String,
  date: Date,
  photos: [String]
  },
  {
    timestamps: true,
  }
)

const questionSchema = new mongoose.Schema(
  {
  question_id: { type: Number, unique: true },
  question_body: String,
  asker_name: String,
  question_helpfulness: Number,
  question_reported: Boolean,
  product_id: Number,
  email: String,
  date: Date,
  answers: [answerSchema],
  },
  {
    timestamps: true,
  }
)

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
// const Photo = mongoose.model('Photo', photoSchema);

module.exports = { Question, Answer };