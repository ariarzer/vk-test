const url = require('url');
const express = require('express');

const buildTree = require('./utils/buildTree.js');
const find = require('./utils/find.js');

const users = require('./data/users.json');

const names = {};
Object.keys(users).map((key) => {
  names[key] = users[key].personalName;
  return 0;
});

const namesTree = buildTree(names);

const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static('static'));

app.get('/search', (req, res) => {
  const { value } = url.parse(req.url, true).query;
  res.send(find(namesTree, users, value));
});

app.listen(process.env.PORT || 8080);
