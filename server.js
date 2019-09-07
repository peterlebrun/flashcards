const express = require('express');
const path = require('path');
const app = express();
const port = 8888;
// This will be replaced with a proper database at some point no futuro
const data = require('./data.json');

app.get('/flashcards', (req, res) => {
  //res.header('Access-Control-Allow-Origin', 'localhost:9000');
  res.json(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
