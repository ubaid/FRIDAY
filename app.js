const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const pe = require('parse-error');
const cors = require('cors');
const path = require('path');
const v1 = require('./routes/v1');

const app = express();
const config = require('./config/config');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.get('/login', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/public/views/login.html`));
  //__dirname : It will resolve to your project folder.
});

app.get('/', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/public/views/index.html`));
  //__dirname : It will resolve to your project folder.
});

app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

app.use(passport.initialize());

app.use(cors());

app.use('/v1', v1);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// eslint-disable-next-line no-console
console.log('Environment:', config.app);

module.exports = app;

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Error', pe(error));
});
