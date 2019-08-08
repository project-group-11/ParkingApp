const express = require('express');
const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
});
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.engine('handlebars', handlebars.engine);

app.set('port', process.argv[2] || 4231);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "Yz1phIjvWxQrSt90dEf2UKlbC678MnAO"}));
app.use(express.static('public'));

/**
 * Landing Page
 */
app.get('/', (req, res, next) => {
  if (session.page_views){
    const context = {};
    session.page_views++;
    context.sample_text = `Page visited ${session.page_views} times this session.`;
    res.render('menu',context);
  } else {
    const context = {};
    session.page_views = 1;
    context.sample_text = 'Beginning Session.';
    res.render('menu',context);
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
