'use strict';

const express = require('express');

const router = express.Router();

router.get('/polls', (req, res) => {
  res.json([]);
});

router.get('/poll/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id });
});
router.post('/new', (req, res) => {
  const data = req.body;
  console.log(data);
  res.json(data);
});

module.exports = router;
