const mongoose = require('mongoose');
const User = require('./Schema');

module.exports = mongoose.model('User', User);
