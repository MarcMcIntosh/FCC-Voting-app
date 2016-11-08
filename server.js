'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api/index');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./build')));
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./build', 'index.html'));
});

app.listen(port);
