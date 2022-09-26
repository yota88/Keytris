const express = require('express');
const path = require('path');
const app = express();
// const compression = require('compression');

// app.use(compression());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

module.exports = app;