'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const port = process.env.PORT || 8080;
const app = express();
const dir = path.resolve('./', './build', './client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dir));
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(dir, 'index.html'));
});

app.listen(port);
