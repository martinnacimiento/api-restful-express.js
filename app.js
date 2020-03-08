//imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const boom = require('boom');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsApiRouter = require('./routes/api/products');
var authApiRouter = require('./routes/api/auth');
const isRequestAjaxOrAPi = require('./utils/isRequestAjaxOrApi');

const { 
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers');

//const index = require("./app/controllers/products");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productsApiRouter);
app.use('/api/auth', authApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if (isRequestAjaxOrAPi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound();
    res.status(statusCode).json(payload);
  }
  next(createError(404));
});

// error handler
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 */
module.exports = app;
