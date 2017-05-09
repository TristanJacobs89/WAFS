/*jshint esversion: 6 */


/* DEPENDENCY DECLARATIONS
======================================= */
const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const app           = express();

/* SERVER PORT
======================================= */
const PORT = 3000;

/* VIEW ENGINE SETUP
======================================= */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* ROUTES
======================================= */

// INDEX PAGE
app.get('/', (req, res) => {
  console.log('Navigated to index page');
  res.render('index', { title: 'FlixFinder' });
});

// RESULTS PAGE
app.get('/results', (req, res) => {
  console.log('Navigated to results page');
  res.render('results', { title: 'Results page' });
});

/* START SERVER
======================================= */
app.listen(PORT);
console.log('Server live at: http://localhost:' + PORT);

/* EXPORT
======================================= */
module.exports = app;
