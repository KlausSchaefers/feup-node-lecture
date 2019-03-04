import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3'
import Events from './Events'

/**
* create express instance
*/
const app = express();

/**
 * configure express
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Create data base
 */
let db = new sqlite3.Database(':memory:'); //new sqlite3.Database('./db/test.db', sqlite3.OPEN_READWRITE);

/**
 * Create events repository
 */
let eventsRepository = new Events(db)


/**
 * create the endpoints
 */
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/hello/:name', function (req, res) {
  res.send(`Hello ${req.params.name}`)
})

app.get('/events', function (req, res) {
  eventsRepository.findAll().then(rows => {
    res.send(rows)
  })
})

app.post('/events', function (req, res) {
  let event = req.body
  eventsRepository.create(event.device, event.type, event.value).then(id => {
    res.send({id: id})
  })
})

/**
 * Have a shutdown listener to clean up
 */
process.on('SIGINT', () => {
  console.debug('app.end!')
  db.close();
});

/** 
 * Export the app via commonJS exports
 */
module.exports = app;

