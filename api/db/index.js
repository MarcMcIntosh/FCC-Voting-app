'use strict';

const mongoose = require('mongoose');
const Schemas = require('./Schemas');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test');
const db = mongoose.connection;
const Poll = mongoose.model('Poll', Schemas.Poll);

db.on('error', err => console.error(err));
db.on('open', () => {
  console.log('Mogoose Connected');
});

function getPolls(cb) {
  const query = Poll.find();
  query.exec((err, docs) => {
    if (err) return cb(err);
    return cb(null, docs);
  });
}
function getPollById(id, cb) {
  const query = Poll.findById(id);
  query.exex((err, poll) => {
    if (err) return cb(err);
    return cb(null, poll);
  });
}

function createPoll(obj, cb) {
  Poll.create(obj, (err, doc) => {
    if (err) return cb(err);
    return cb(null, doc);
  });
}

function vote(poll, answer, user) {
  return;
};

module.exports = {
  getPolls,
  createPoll,
  getPollById,
  vote,
};
