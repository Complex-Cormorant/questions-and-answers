const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/qa/questions', db.getQuestions)
app.get('/qa/questions/:question_id/answers', db.getAnswers)
app.put('/qa/questions/:question_id/helpful', db.markQuestionHelpful)
app.put('/qa/questions/:question_id/report', db.reportQuestion)
app.put('/qa/answers/:answer_id/helpful', db.markAnswerHelpful)
app.put('/qa/answers/:answer_id/report', db.reportAnswer)