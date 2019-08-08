const express = require('express');
const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
});
const bodyParser = require('body-parser');

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
