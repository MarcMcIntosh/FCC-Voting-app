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
/*
Poll.statics.idArray = function idArray(arr, callback) {
  const ids = arr.map(d => mongoose.Types.ObjectId(d));
  return this.find({ _id: { $in: ids } }).toArray(callback);
};
// Methods get called on / by a document
Poll.methods({
  voteFor: (answerId, cb) => {
    const doc = { 'answers._id': answerId };
    const update = { $inc: { votes: 1 } };
    return this.update(doc, update, err => cb(err));
  },
  removeVoteFor: (answerId, cb) => {
    const doc = { 'answers._id': answerId };
    const update = { $inc: { votes: -1 } };
    return this.update(doc, update, err => cb(err));
  },
  changeVoteFor: (from, to, cb) => {
    this.removeVoteFor(from, (err) => {
      if (err) return cb(err);
      return this.voteFor(to, cb);
    });
  },
  addAnswerTo: (str, cb) => {
    this.answers.push(str).save(err => cb(err));
  },
});
*/
module.exports = mongoose.model('Poll', Poll);
