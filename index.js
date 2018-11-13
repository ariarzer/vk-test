const url = require('url');
const express = require('express');

const buildTree = require('./utils/buildTree.js');
const find = require('./utils/find.js');

const users = require('./data/users.json');

const personalName = {};
Object.keys(users).map((key) => {
  personalName[key] = users[key].personalName;
  return 0;
});

const familyName = {};
Object.keys(users).map((key) => {
  familyName[key] = users[key].familyName;
  return 0;
});

const tree = buildTree(personalName, buildTree(familyName));

const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static('static'));

app.get('/search', (req, res) => {
  const { value } = url.parse(req.url, true).query;
  res.send(find(tree, users, value));
});

app.listen(process.env.PORT || 8080);
