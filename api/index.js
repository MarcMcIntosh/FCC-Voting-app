'use strict';

const assert = require('assert');
const express = require('express');
const db = require('./db/index');

const router = express.Router();

router.get('/polls', (req, res) => {
  db.getPolls((err, polls) => {
    if (err) {
      res.json(err);
    } else {
      res.json(polls);
    }
  });
});

router.get('/poll/:id', (req, res) => {
  const id = req.params.id;
  db.getPollById(id, (err, poll) => {
    if (err) {
      res.json(err);
    } else {
      res.json(poll);
    }
  });
});

router.post('/new', (req, res) => {
  const data = req.body;
  db.createPoll(data, (err, poll) => {
    if (err) {
      res.json(err);
    } else {
      res.json(poll);
    }
  });
});

module.exports = router;
