'use strict';

const express = require('express');
const passport = require('passport');
// const Poll = require('./models/Poll');
const Poll = require('./controllers/Poll');
//const User = require('./controllers/User');
const User = require('./models/User');

function createUser(obj, cb) {
  const username = obj.username;
  const password = obj.password;
  const email = obj.email;
  const votes = obj.votes || [];
  User.register(new User({
    username,
    email,
    votes,
  }), password, (err, account) => cb(err, account));
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.json({
    type: 'error',
    success: false,
    message: 'Not logged in',
  });
}

function signIn(req, res, next) {
  function signInError(type, payload) {
    return res.json({ type, success: false, message: `Failed to ${type} user`, payload });
  }
  return passport.authenticate('local', (err, user, info) => {
    if (err || !user) return signInError('sign-in', err || info);
    return req.logIn(user, (error) => {
      if (error) return signInError('log-in', error);
      return next();
    });
  })(req, res, next);
}

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
      res.json({
        type: 'poll',
        success: false,
        message: 'failed to get poll by id provided',
        payload: err,
      });
    } else {
      res.json({
        type: 'poll',
        success: true,
        message: 'poll using id found',
        payload: poll,
      });
    }
  });
});

router.post('/new', (req, res) => {
  const data = req.body;
  Poll.createPoll(data, (err, poll) => {
    if (err) {
      res.json({
        type: 'error',
        success: false,
        message: 'Error creating poll',
        payload: err,
      });
    } else {
      res.json({
        type: 'create new poll',
        success: true,
        message: 'Poll created',
        payload: poll,
      });
    }
  });
});

router.post('/signup', (req, res) => {
  /* Check for session */
  // console.log('Request to createing New User');
  // console.log(req.session);
  createUser(req.body, (err, acc) => {
    if (err) {
      res.json({
        type: 'signup',
        success: false,
        message: 'Error creating user',
        payload: err,
      });
    } else {
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
      */
        res.json({
          type: 'signup',
          success: true,
          message: 'user created',
          payload: acc,
        });
      });
    }
  });
});

router.post('/signin', signIn, (req, res) => {
  res.json(req.user);
});

router.get('/signout', isLoggedIn, (req, res) => {
  req.logout();
  res.json({
    type: 'signout',
    success: true,
    message: 'successfully signed out',
    payload: null,
  });
});

router.get('/account', isLoggedIn, (req, res) => {
  res.json({
    type: 'account',
    success: true,
    message: 'user acount information retreived',
    payload: req.user,
  });
});

module.exports = router;
