// content of index.js
const main = require('./main');
const express = require('express');
const bodyParser = require('body-parser');
const expressServer = express();

expressServer.use(bodyParser.json());

expressServer.get('/', (req, res) => {
  main.requestHandler(req, res);
});

expressServer.post('/', (req, res) => {
  main.requestHandler(req, res);
});

expressServer.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});