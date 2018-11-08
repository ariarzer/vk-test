const http = require('http');

const server = new http.Server();

server.on('request', (req, res) => {
  res.end('Hello World!');
});

server.listen(process.env.PORT || 8080);
