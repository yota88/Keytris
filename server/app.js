require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
// const compression = require('compression');

// app.use(compression());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

app.get('/words', (req, res) => {
  const options = {
    method: 'GET',
    url: process.env.WORDS_URL,
    params: {random: 'true'},
    headers: {
      'X-RapidAPI-Key': '92bf3efe52mshf910275e4bf90f3p10f0d8jsnd1a85134844b',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };


  axios
    .request(options)
    .then((entry) => {
      console.log(entry.data);
    })
});

module.exports = app;