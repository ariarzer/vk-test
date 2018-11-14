const users = require('../data/users');

const front = {};

Object.keys(users).slice(1, 1001).forEach((key) => {
  front[key] = users[key];
});

console.log(JSON.stringify(front));
