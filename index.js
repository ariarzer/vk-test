const http = require('http');

const express = require('express');

const app = express();

http.createServer(app);

app.listen(process.env.PORT || 8080);

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static('static'));

app.get('/search', (req, res) => {
  res.send({ text: 'Hello' });
});
