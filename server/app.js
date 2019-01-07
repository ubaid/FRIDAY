const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require('http');
const pe = require('parse-error');
const cors = require('cors');
const path = require('path');
const v1 = require('./routes/v1');
const routes = require('./routes/routes');
const DVUtils = require('../shared/utils');
const config = require('./config/config');

const app = express();
app.use(cookieParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '../public')));

app.use(passport.initialize());

app.use(cors());

app.use('/v1', v1);
app.use(routes());

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

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Error', pe(error));
});

const port = DVUtils.normalizePort(config.port || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${ port }` : `Port ${ port }`;
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${ bind } requires elevated privileges`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${ bind } is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${
    typeof addr === 'string' ? `pipe ${ addr }` : `port ${ addr.port }`
  }`);
});
