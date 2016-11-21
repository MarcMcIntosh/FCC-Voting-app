'use strict';

const mongoose = require('mongoose');
const Poll = require('./Schema');

Poll.statics.idArray = function idArray(arr, callback) {
  const ids = arr.map(d => mongoose.Types.ObjectId(d));
  return this.find({ _id: { $in: ids } }).toArray(callback);
};

Poll.statics.voteFor = function vf(answerId, cb) {
  const doc = { 'answers._id': answerId };
  const update = { $inc: { votes: 1 } };
  return this.update(doc, update, err => cb(err));
};

Poll.statics.removeVoteFor = function rm(_id, answerId, cb) {
  const doc = { _id, 'answers._id': answerId };
  const update = { $inc: { 'answers.$.votes': -1 } };
  return this.update(doc, update, err => cb(err));
};

Poll.statics.changeVoteFor = function cv(_id, from, to, cb) {
  return this.removeVoteFor(from, (err) => {
    if (err) return cb(err);
    return this.voteFor(to, cb);
  });
};

Poll.statics.addAnswerTo = function mk(_id, str, cb) {
  return this.update(_id, {
    $addToSet: { answers: { answer: str } },
  }, {
    upsert: true, setDefaultsOnInser: true,
  }).save(err => cb(err));
};

module.exports = mongoose.model('Poll', Poll);
