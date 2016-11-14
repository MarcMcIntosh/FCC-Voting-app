'use strict';

const mongoose = require('mongoose');

const Poll = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [{
    answer: { type: String, required: true },
    votes: { type: Number, default: 0 },
  }],
  timestamp: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Poll', Poll);
