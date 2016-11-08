const Schema = require('mongoose').Schema;

const Poll = new Schema({
  question: { type: String, required: true },
  answers: [{
    answer: { type: String, required: true },
    votes: { type: Number, default: 0 },
  }],
  timestamp: { type: Date, default: Date.now },
  owner: {
    type: String,
    // required: true,
    default: 'Marc',
  },
});

module.exports = {
  Poll,
};
