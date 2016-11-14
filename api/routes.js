'use strict';

const express = require('express');
const passport = require('passport');
const Poll = require('./controllers/Poll');
const User = require('./User/Model');


function createUser(req, res, next) {
  const { name, password, email, votes = [] } = req.body;
  User.register(new User({
    name,
    email,
    votes,
  }), password, (err) => {
    if (err) {
      return res.json({
        type: 'signup',
        success: false,
        message: 'Error creating user',
        payload: err,
      });
    }
    return next();
  });
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


router.post('/signup', createUser, signIn, (req, res) => {
  const { name, _id, votes, polls } = req.user;
  res.json({
    type: 'signup',
    success: true,
    message: 'new user created and logged in',
    payload: { _id, name, votes, polls },
  });
});

router.post('/signin', signIn, (req, res) => {
  const { _id, name, polls, votes } = req.user;
  res.json({
    type: 'signin',
    success: true,
    message: 'User Sign-in successfull',
    payload: { _id, name, polls, votes },
  });
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
  const { _id, name, email, votes, polls } = req.user;
  res.json({
    type: 'account',
    success: true,
    message: 'user acount information retreived',
    payload: { _id, name, email, votes, polls },
  });
});

module.exports = router;
