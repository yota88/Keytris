require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
// const compression = require('compression');

// app.use(compression());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

app.get('/word', (req, res) => {
  const randomPg = Math.floor(Math.random() * 340);
  const options = {
    method: 'GET',
    url: process.env.WORDS_URL,
    params: {
      lettersMin: 4,
      lettersMax: 6,
      page: randomPg,
    },
    headers: {
      'X-RapidAPI-Key': '92bf3efe52mshf910275e4bf90f3p10f0d8jsnd1a85134844b',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  axios
    .request(options)
    .then((entry) => {
      const wordList = entry.data.results.data;
      const randomIndex = Math.floor(Math.random() * wordList.length);
      console.log('wordList', wordList);
      console.log('random word', wordList[randomIndex]);
      const randomWord = wordList[randomIndex];
      res.status(200);
      res.send(randomWord);
    })
});

module.exports = app;