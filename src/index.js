import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';

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
 * create the endpoints
 */
app.get('/', (req, res) => res.send('Hello World!'))


app.get('/hello/:name', function (req, res) {
  res.send(`Hello ${req.params.name}`)
})


// listen to requests
app.listen(3000);
console.debug('Started at 3000')

module.exports = app;