'use strict';

const mongoose = require('mongoose');
require('mongoose-type-email');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    index: { unique: true },
    required: true,
  },
  votes: [{
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    vote: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  }],
  polls: [mongoose.Schema.Types.ObjectId],
}, {
  timestamps: true,
});

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

module.exports = User;
