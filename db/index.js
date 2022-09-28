require('dotenv').config();
const { Pool } = require('pg');
const { scores } = require('./tables.js');

const credentials = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PW,
  port: process.env.PG_PORT,
};

const pool = new Pool(credentials);

// Run function below to initialize db table creation if needed

// async function connectClient() {
//   const client = await pool.connect();
//   console.log('Connected to sdc db successfully');
//   try {
//     const users = await client.query(scores);
//   }
//   catch (err) {
//     console.log(`Something wrong happened: ${err}`);
//   }
//   finally {
//     client.release();
//     console.log('Client disconnected successfully');
//   }
// };

// connectClient();

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
}