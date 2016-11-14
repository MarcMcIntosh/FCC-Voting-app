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

/* function signIn(obj, cb) {
  const username = obj.username;
  const password = obj.password;

}*/
function signIn(obj, cb) {
//  console.log(User);
  const username = obj.username;
  const password = obj.password;
  //console.log(User.authenticate.toString());
  User.authenticate(username, password, (err, user) =>{
    console.log('Trying to auth');
    if(err) {
      console.error(err)
    } else {
      console.log('No error');
      console.log(user);
    }
  });
  /* User.findByUsername(username, (err, user) =>{
    if (err) return cb(err);
    console.log('Username valid');
    console.log(user);

  }); */
  /*User.authenticate(username, password, (err, user, info) => {
    if (err || !user) {
      console.log('error');
      console.log(err);
      console.log(info);
      cb(err || info);
    } else {
      cb(null, user);
    }
  });*/
  /* return User.findByUsername(username, (err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
  */
}

module.exports = {
  createUser,
  authenticate: User.authenticate,
};
