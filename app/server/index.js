require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const port = 8888;
const TOKEN = 'FAKE-AUTH-TOKEN'; // obv this is only for testing, real auth token hidden
// For testing
const sqlite3 = require('sqlite3').verbose();

app.use(express.json());
// TIL about preflight requests
app.options('/api/flashcards', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Express-Auth-Token');
  res.sendStatus(200);
});

app.options('/api/flashcard/create', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Express-Auth-Token');
  res.sendStatus(200);
});

app.options('/api/flashcard/create-multi', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Express-Auth-Token');
  res.sendStatus(200);
});

// TIL about preflight requests
app.options('/api/attempt/create', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Express-Auth-Token');
  res.sendStatus(200);
});

app.get('/api/flashcards', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  let db = new sqlite3.Database('./server/data/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  let query = `
SELECT
    flashcard.id AS 'id'
  , flashcard.front AS 'front'
  , flashcard.back AS 'back'
  , SUM(IFNULL(attempt.success, 0)) AS 'attempts'
FROM flashcard
LEFT JOIN attempt ON flashcard.id = attempt.flashcard_id
GROUP BY flashcard.id
ORDER BY attempts ASC
;
`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.post('/api/flashcard/create', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  let front = req.body.front;
  let back = req.body.back;

  let db = new sqlite3.Database('./server/data/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  db.run('INSERT INTO flashcard (front, back) VALUES (?, ?);', [req.body.front, req.body.back], (e) => {
    if (e) {
      console.log(e);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

app.post('/api/flashcard/create-multi', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  if (req.body.cards) {
    console.log(typeof(req.body));
    console.log(typeof(req.body.cards));
    console.log(req.body.cards);
    console.log(req.body.cards.cards[0]);
    //let cards = req.body.cards;
    //console.log(cards);
    //cards.foreach(card => console.log(card));
  }
  res.sendStatus(200);
  /*
  let front = req.body.front;
  let back = req.body.back;

  let db = new sqlite3.Database('./server/data/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  db.run('INSERT INTO flashcard (front, back) VALUES (?, ?);', [req.body.front, req.body.back], (e) => {
    if (e) {
      console.log(e);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
  */
});

app.post('/api/attempt/create', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  let flashcardId = req.body.flashcard_id;
  let reviewSuccess = req.body.review_success === "true" ? 1 : 0;

  let db = new sqlite3.Database('./server/data/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  db.run('INSERT INTO attempt (flashcard_id, success) VALUES (?, ?);', [flashcardId, reviewSuccess], (e) => {
    if (e) {
      console.log(e);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

app.use(require('express-session')({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false
}));

const { ExpressOIDC } = require('@okta/oidc-middleware');
const oidc = new ExpressOIDC({
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile'
});

app.use(oidc.router);

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
