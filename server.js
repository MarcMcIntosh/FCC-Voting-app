'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// Passport guide http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/#.WCM5dswypxA
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const helmet = require('helmet');

const api = require('./api/index');

const port = process.env.PORT || 8080;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./build')));
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./build', 'index.html'));
});

app.listen(port);
