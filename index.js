const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/qanda';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

module.exports = db;
