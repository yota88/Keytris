require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const compression = require('compression');
const db = require('../db');

app.use(compression());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

const modes = {
  '0': 'noob',
  '1': 'rando',
  '2': 'uber',
  '3': 'leet',
}

app.post('/scores', async (req, res) => {
  const { name, score, mode } = req.body;
  console.log('mode', mode);
  await db.query(`INSERT INTO scores
  (name, ${modes[mode]})
  VALUES ('${name}', ${score})
  ON CONFLICT (name)
  DO UPDATE SET ${modes[mode]} = ${score}
  WHERE scores.${modes[mode]} < ${score}`);
});

app.get('/scores', async (req, res) => {
  const noobLeaders = await db.query(`SELECT name FROM scores
    ORDER BY noob DESC LIMIT 5`);
  const randoLeaders = await db.query(`SELECT name FROM scores
    ORDER BY rando DESC LIMIT 5`);
  const uberLeaders = await db.query(`SELECT name FROM scores
    ORDER BY uber DESC LIMIT 5`);
  const leetLeaders = await db.query(`SELECT name FROM scores
    ORDER BY leet DESC LIMIT 5`);
  console.log(noobLeaders.rows);
  res.send([noobLeaders.rows, rando]);
})

module.exports = app;