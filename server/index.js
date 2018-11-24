const express = require('express');

const User = require('../libs/users');
const FindTree = require('../libs/find-tree');

const usersData = require('../data/users.json');

const users = new User(usersData);
const tree = new FindTree(users.getByField('personalName'), new FindTree(users.getByField('familyName')).tree);

const app = express();

app.use(express.static('static'));

// const sleep = time => new Promise(r => setTimeout(r, time * 1000));

app.get('/api/v0/search', async (req, res) => {
  // await sleep(1.5);

  const { value } = req.query;
  res.send(tree.find(value, usersData));
});

app.get('/api/v0/users', async (req, res) => {
  // await sleep(1.5);

  let items;
  const { ids, start, count } = req.query;

  if (ids) {
    items = JSON.parse(ids).reduce((acc, cur) => ({ ...acc, [cur]: usersData[cur] }), {});
  }

  if (start && count) {
    items = Object.keys(usersData)
      .slice(+start, +start + +count)
      .reduce((acc, cur) => ({ ...acc, [cur]: usersData[cur] }), {});
  }

  res.send({
    items,
    meta: {
      totalCount: Object.keys(usersData).length,
    },
  });
});

app.listen(process.env.PORT || 8080, (error) => {
  if (error) {
    console.error(error);
  }
});
