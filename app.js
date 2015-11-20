
var express = module.exports.express = require('express');

//required libararies
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

var app = module.exports.app = express();
global.appserver = http.createServer(app);

var port = process.env.PORT || 3000;


var session = require('express-session');

// Routes
var routes = require('./routes/index');


var router = express.Router();

// app.use(logfmt.requestLogger());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 6000000
  }
}));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/// Routes ///
app.use('/', routes);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers
// development error handler
// will print stacktrace

if (!process.env.NODE_ENV) {
  globalEnv = 'development';
  console.log('#### Custom Theme App  ####');
  console.log('Server listening to port ' + 3000);
  appserver.listen(process.env.PORT || 3000);
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(express.static(__dirname + 'public'));
module.exports = app;
