'use strict';

const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const helmet = require('helmet');
// const api = require('./api/index');
const api = require('./api/routes');
const User = require('./api/User/Model');

/* Connect to MongoDb */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test');
const db = mongoose.connection;
db.on('error', (err) => {
  /* Crash */ // throw err;
  console.error(err);
});

const port = process.env.PORT || 8080;
/* Session Settings */
const sess = {
  secret: process.env.SESS_KEY,
  name: 'FCC-Voting-App',
  cookie: {
    // domain: 'localhost',
    secure: 'auto',
    httpOnly: true,
    maxAge: 604800,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};

const app = express();

/* Security headers */
app.use(helmet());

/* Form parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Session middleware */
app.use(session(sess));

/* User authentication */
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/* Public Directory */
app.use(express.static(path.resolve('./build')));

/* Routes for api requests */
app.use('/api', api);

/* Default to sendig all non api requests to public dir */
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./build', 'index.html'));
});

app.listen(port);
