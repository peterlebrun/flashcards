const express = require('express');
const path = require('path');
const app = express();
const port = 8888;
// This will be replaced with a proper database at some point no futuro
const data = require('./data.json');
const TOKEN = 'FAKE-AUTH-TOKEN'; // obv this is only for testing, real auth token hidden

// TIL about preflight requests
app.options('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Express-Auth-Token');
  res.send(200);
});

app.get('/api', (req, res) => {
  console.log(req.headers);
  res.json(data);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
