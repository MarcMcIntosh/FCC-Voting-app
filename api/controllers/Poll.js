'use strict';

const Poll = require('../models/Poll');

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

module.exports = {
  getPolls,
  getPollById,
  createPoll,
};
