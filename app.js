const express = require('express');
const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
});
const bodyParser = require('body-parser');
const accounts = require('./userDB.js');

const app = express();
app.engine('handlebars', handlebars.engine);

app.set('port', process.argv[2] || 4231);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

/**
 * Landing Page
 */
app.get('/', (req, res, next) => {
  const context = {};
  context.sample_text = 'Menu';
  res.render('menu',context);
});

/**
 * Handle user database requests:
 * add, delete, and update an account
 */
app.post('/', (req, res, next) => {
  //// VERIFY ACCOUNT HERE ////
  // if(req.body.token is not session.username's token) return;
  ////
  if (req.body.action === 'addAccount') {
    accounts.addAccount(req.body,
        (err, rows) => {
          if (err) {
            next(err);
            return;
          }
          res.send(rows[0]);
        });
  } else if (req.body.action === 'deleteAccount') {
    accounts.deleteAccount(req.body.rowIndex,
        (err, result, field) => {
          if (err) {
            next(err);
            return;
          }
          console.log('Deleted ' + result.affectedRows + ' row');
          res.sendStatus(200);
        });
  } else if (req.body.action === 'updateAccount') {
    accounts.updateAccount(req.body,
        (err, result) => {
          if (err) {
            next(err);
            return;
          }
          console.log('Updated ' + result.affectedRows + ' row');
          res.sendStatus(200);
        });
  }
});

/**
 * Handle 404 Error -
 * Page not Found
 */
app.use((req, res) => {
  res.status(404);
  res.render('404');
});


/**
 * Handle 500 Error -
 * All Other Server Errors
 */
app.use((err, req, res) => {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
