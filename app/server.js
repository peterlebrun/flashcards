const express = require('express');
const path = require('path');
const app = express();
const port = 8888;
// This will be replaced with a proper database at some point no futuro
const data = require('./data.json');

app.get('/api', (req, res) => {
  res.json(data);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
