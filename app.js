//imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const boom = require('boom');
const helmet = require("helmet");
const cors = require('cors');
const productsRouter = require('./routes/views/products');
const usersRouter = require('./routes/views/users');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');
const isRequestAjaxOrAPi = require('./utils/isRequestAjaxOrApi');
const { 
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// routes
app.use('/', productsRouter);
productsApiRouter(app);
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

module.exports = app;
