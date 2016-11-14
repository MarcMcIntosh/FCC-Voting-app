'user strict';
const fetch = require('isomorphic-fetch');

fetch('http://localhost:8080/api/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Marc',
    password: 'guest',
    email: 'email@marcmcintosh.ninja'
  })
}).then(response =>{
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}).then((response) => {
  return response.json();
}).then(json => console.log(json)).catch((err) => {
  console.error(err)
});
