var hbs     = require('express3-handlebars')
  , express = require('express')
  , requestTypeOverride = require('./middleware/requestTypeOverride')
  , spaRequestFilter    = require('./middleware/spaRequestFilter')
  , app = express()
  , server;

// ### Configure application
app.configure(function () {
  app.use(requestTypeOverride);  // allows request type override via querystring param
  app.use(spaRequestFilter);     // activates interceptor for serving SPA app shell HTML (*after* static middleware)
  app.use(app.router);           // activates routing in the pipeline

  // # view engine setup
  app.engine('html', hbs({ defaultLayout: 'layout', extname: '.html' }));
  app.set('view engine', 'html');
});

// ### Application routes
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/users/:id', function (req, res) {
  var id = req.params.id
  res.send({ id: id, username: 'marko' });
});

// ### Start application
server = app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});
