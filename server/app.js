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
  const noobLeaders = await db.query(`SELECT name, noob FROM scores
    WHERE noob > 0
    ORDER BY noob DESC LIMIT 5`);
  const randoLeaders = await db.query(`SELECT name, rando FROM scores
    WHERE rando > 0
    ORDER BY rando DESC LIMIT 5`);
  const uberLeaders = await db.query(`SELECT name, uber FROM scores
    WHERE uber > 0
    ORDER BY uber DESC LIMIT 5`);
  const leetLeaders = await db.query(`SELECT name, leet FROM scores
    WHERE leet > 0
    ORDER BY leet DESC LIMIT 5`);
  console.log(noobLeaders.rows);
  res.send([noobLeaders.rows, randoLeaders.rows, uberLeaders.rows, leetLeaders.rows]);
});

app.get('/score/single', async (req, res) => {
  const userInfo = req.query;
  console.log(userInfo);
  const userScore = await db.query(`SELECT ${modes[userInfo.mode]} FROM scores
    WHERE name = '${userInfo.name}'`);
  res.send(userScore.rows);
})

module.exports = app;