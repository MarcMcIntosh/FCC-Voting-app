'use strict';

// const net = require('net');
const mongoose = require('mongoose');
require('mongoose-type-email');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
  // username: { type: String, required: true },
  // password: { type: String, required: true },
  email: {
    type: mongoose.SchemaTypes.Email,
    index: { unique: true },
    required: true,
  },
/* ip: {
    type: String,
    validate: { validator: val => (net.isIP(val) > 0) },
    message: '{VALUE} is and invalid IP address',
    required: [true, 'User IP address required'],
  },*/
  votes: [{
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    vote: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  }],
  polls: [mongoose.Schema.Types.ObjectId],
});
/*
User.statics.serializeUser = function () {
  return (user, cb) => cb(null, user.id);
};

User.statics.deserializeUser = function () {
  return (id, cb) => this.findOne(id, cb);
};*/

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
