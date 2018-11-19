const express = require('express');

const User = require('../libs/users');
const FindTree = require('../libs/find-tree');

const usersData = require('../data/users.json');

const users = new User(usersData);
const tree = new FindTree(users.get('personalName'), new FindTree(users.get('familyName')).tree);

const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static('static'));

app.get('/search', (req, res) => {
  const { value } = req.query;
  res.send(tree.find(value, usersData));
});

app.listen(process.env.PORT || 8080, (error) => {
  if (error) {
    console.error(error);
  }
});