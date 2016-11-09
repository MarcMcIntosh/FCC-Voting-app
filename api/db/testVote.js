const assert = require('assert');
const mongoose = require('mongoose');
const Schemas = require('./Schemas');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test');
const Poll = mongoose.model('Poll', Schemas.Poll);
Poll.findById('58220bd06a212e2b01a22d1e', (error, doc) => {
  assert.equal(null, error);
  console.log(doc.answers.id('58220bd06a212e2b01a22d1f'));
});
