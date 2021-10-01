const { Pool, Client } = require("pg");

const credentials = {
  user: "fikri",
  host: "localhost",
  database: "questionsandanswers",
  password: "fikri",
  port: 5432,
};

const pool = new Pool(credentials);

// Connect with a connection pool.

//async function poolDemo() {
//  const pool = new Pool(credentials);
//  const now = await pool.query("SELECT NOW()");
//  await pool.end();
//
//  return now;
//}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}

//async function getQuestions(productId) {
//  const pool = new Pool(credentials);
//  const text = `SELECT * FROM questions WHERE product_id = $1`;
//  const values = [productId];
//  await pool.end();
//  return pool.query(text, values);
//}


// Use a self-calling function so we can use async / await.

//(async () => {
//  const poolResult = await poolDemo();
//  console.log("Time with pool: " + poolResult.rows[0]["now"]);
//
//  const clientResult = await clientDemo();
//  console.log("Time with client: " + clientResult.rows[0]["now"]);
//
//  const questionsResult = await getQuestions(785995);
//  console.log("Questions " + JSON.stringify(questionsResult.rows, null, " "));
//})();

//const client = new Client(credentials);

//client.connect();
//
//client.query(`SELECT * FROM questions WHERE reported = 'f' ORDER BY helpfulness DESC LIMIT 100`, (err, res)=>{
//  if(!err){
//    console.log(res.rows);
//  } else {
//    console.log(err.message);
//  }
//  client.end;
//})

const getQuestions = (request, response) => {
  const id = request.query.product_id;
  const count = request.query.count || 5;
  const page = request.query.page || 1;
  const offset = count * (page - 1);
  pool.query(`SELECT question_id, question_body, to_timestamp(cast(question_date/1000 as bigint))::date AS question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id=$1 AND reported='f' ORDER BY question_helpfulness DESC LIMIT $2 OFFSET $3`, [id, count, offset], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({product_id: id, results: results.rows})
  })
}

const getAnswers = (request, response) => {
  const id = request.params.question_id;
  const count = Number(request.query.count) || 5;
  const page = Number(request.query.page) || 1;
  const offset = count * (page - 1);
  pool.query(`SELECT answer_id, answer_body AS body, to_timestamp(cast(answer_date/1000 as bigint))::date AS date, answerer_name, helpfulness FROM answers WHERE answer_id=$1 AND reported='f' ORDER BY helpfulness DESC LIMIT $2 OFFSET $3`, [id, count, offset], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({question: id, page, count, results: results.rows})
  })
}

const getPhotos = (request, response) => {

}

module.exports = {
  getQuestions,
  getAnswers
}