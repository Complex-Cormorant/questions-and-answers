const { Pool, Client } = require("pg");

const credentials = {
  user: "fikri",
  host: "localhost",
  database: "questionsandanswers",
  password: "fikri",
  port: 5432,
};

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}

async function getQuestions(productId) {
  const pool = new Pool(credentials);
  const text = `SELECT * FROM questions WHERE product_id = $1`;
  const values = [productId];
  return pool.query(text, values);
}


// Use a self-calling function so we can use async / await.

(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: " + poolResult.rows[0]["now"]);

  const clientResult = await clientDemo();
  console.log("Time with client: " + clientResult.rows[0]["now"]);

  const questionsResult = await getQuestions(785995);
  console.log("Questions " + JSON.stringify(questionsResult.rows, null, " "));
})();

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