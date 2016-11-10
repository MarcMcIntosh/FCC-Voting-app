'use strict';

const User = require('../models/User');

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

module.exports = {
  createUser,
};
