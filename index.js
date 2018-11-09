const express = require('express');
const app = express();

app.get('/', express.static('static'));

app.listen(process.env.PORT || 8080);