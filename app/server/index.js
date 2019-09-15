const express = require('express');
const path = require('path');
const app = express();
const port = 8888;
// This will be replaced with a proper database at some point no futuro
const data = require('./data/data.json');
const TOKEN = 'FAKE-AUTH-TOKEN'; // obv this is only for testing, real auth token hidden
// For testing
const sqlite3 = require('sqlite3').verbose();

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

app.get('/test', (req, res) => {
  let results = { rows: [] };

  let db = new sqlite3.Database('./data/test.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  // Need to wrap this in a promise but I am running late
  db.serialize(() => {
    db.each(`SELECT id, name FROM test_table`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
      results.rows.push({
        id: row.id,
        name: row.name,
      });
    });
    console.log(results);
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
    console.log('async hell');
    res.json(results);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
