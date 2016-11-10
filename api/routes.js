'use strict';

const express = require('express');
const passport = require('passport');
// const Poll = require('./models/Poll');
const Poll = require('./controllers/Poll');
const User = require('./controllers/User');

const router = express.Router();

router.get('/polls', (req, res) => {
  Poll.getPolls((err, polls) => {
    if (err) {
      res.json(err);
    } else {
      res.json(polls);
    }
  });
});

router.get('/poll/:id', (req, res) => {
  const id = req.params.id;
  Poll.getPollById(id, (err, poll) => {
    if (err) {
      res.json(err);
    } else {
      res.json(poll);
    }
  });
});

router.post('/new', (req, res) => {
  const data = req.body;
  Poll.createPoll(data, (err, poll) => {
    if (err) {
      res.json(err);
    } else {
      res.json(poll);
    }
  });
});

router.get('/user', (req, res) => {
  res.json(req);
});

router.post('/signup', (req, res) => {
  /* Check for session */
  // console.log('Request to createing New User');
  // console.log(req.session);
  User.createUser(req.body, (err, acc) => {
    passport.authenticate('local')(req, res, () => {
      /* This should set a client cookie */
      // console.log("Creating New session");
      // console.log(req.session);
      // user data stored in req.user;
      // console.log(req.user);
      // whole requset header
      // console.log(req);
      // check response Settings
      // console.log(res);
      /* res also has
      * res.body containing the posted data
      * and
      * res.sessionStore
      * which container sessionID,
      * session whichis the same as req.session
      * and res.sessionStore.user
      * which is the user documnet  
      res.json(err || acc);
    });
  });
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

module.exports = router;
