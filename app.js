const express = require('express');
const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
});
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const accounts = require('./userDB.js');
const credentials = require('./credentials.js');

const { OAuth2Client } = require('google-auth-library');
const app = express();
app.engine('handlebars', handlebars.engine);

app.set('port', process.argv[2] || 4231);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: credentials.secret }));
app.use(express.static('public'));

app.get('/login', (req, res, next) => {
  res.render('sign-in');
});

app.post('/tokensignin', async (req, res, next) => {
  const client = new OAuth2Client(
    '985046115919-771ojevgk5dn3gr32pkaq91v3d3quk20.apps.googleusercontent.com',
  );

  const user = await verify(client, req.body.idtoken);
  Object.assign(session, user);
  res.redirect('/home');
});

app.use((req, res, next) => {
  //console.log(session.username);
  if (session.username) {
    //console.log('HERE!', req);
    next();
  } else {
    res.redirect('login');
  }
});

app.get('/home', (req, res, next) => {
  const context = {};
  context.title = 'Parking App';
  context.script_path = 'scripts/server.js';
  context.slogan = true;
  res.render('home', context);
});

app.get('/find-space', (req, res, next) => {
  const context = {};
  context.title = 'Find A Space';
  res.render('find-space', context);
});

app.get('/current-space', (req, res, next) => {
  const context = {};
  context.title = 'Current Space';
  res.render('current-space', context);
});

app.get('/account-info', (req, res, next) => {
  const context = {};
  context.title = 'Account Info';
  context.username = session.username;
  context.img_url = session.img_url;
  res.render('account-info', context);
});

app.get('/app-settings', (req, res, next) => {
  const context = {};
  context.title = 'App Settings';
  res.render('app-settings', context);
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
    accounts.addAccount(req.body, (err, rows) => {
      if (err) {
        next(err);
        return;
      }
      res.send(rows[0]);
    });
  } else if (req.body.action === 'deleteAccount') {
    accounts.deleteAccount(req.body.rowIndex, (err, result, field) => {
      if (err) {
        next(err);
        return;
      }
      console.log('Deleted ' + result.affectedRows + ' row');
      res.sendStatus(200);
    });
  } else if (req.body.action === 'updateAccount') {
    accounts.updateAccount(req.body, (err, result) => {
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
  console.log(
    'Express started on http://localhost:' +
      app.get('port') +
      '; press Ctrl-C to terminate.',
  );
});

async function verify(client, token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      '985046115919-771ojevgk5dn3gr32pkaq91v3d3quk20.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();

  const user = {
    token: payload.sub,
    username: payload.name,
    img_url: payload.picture,
  };
  return user;
}
