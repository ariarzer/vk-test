const url = require('url');
const express = require('express');

const User = require('./utils/Users');
const PrefixTree = require('./utils/PrefixTree');

const usersData = require('./data/users.json');

const users = new User(usersData);
const tree = new PrefixTree(users.get('personalName'), new PrefixTree(users.get('familyName')).tree);

const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static('static'));

app.get('/search', (req, res) => {
  const { value } = url.parse(req.url, true).query;
  res.send(tree.find(value, usersData));
});

app.listen(process.env.PORT || 8080, (error) => {
  if (error) {
    console.error(error);
  }
});
