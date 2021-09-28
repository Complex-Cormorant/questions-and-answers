const express = require('express');

const Blogs = require('../mongo-q-and-a.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
