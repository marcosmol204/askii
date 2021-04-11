const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const pino = require('pino-http')();
const morgan = require('morgan');
const { errorHandler, notFoundHandler } = require('../utils/errors/errorHandler');

const app = express();
if (process.env.NODE_ENV != 'production') {
  dotenv.config();
}
require('../utils/errors/proc-man')();

const { apiRouter } = require('../components/api');
const { authRouter } = require('../components/auth');

app.use(morgan('dev'));
app.use(pino);

// const corsOptions = {
//   origin: ['http://localhost:3000','http://172.30.192.1:3000'],
//   methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
//   allowHeaders: ['Content-Type', 'X-Requested-With', 'x-access-token'],
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set(
    'Access-Control-Expose-Headers',
    'date, etag, access-control-allow-origin, access-control-allow-credentials',
  );
  next();
});
app.use(cookieParser());

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  const { refreshToken } = req.cookies;
  console.log('refreshToken:', refreshToken);
  const { accessToken } = req.body;
  console.log('accessToken:', accessToken);
  next();
});

app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);
app.use(notFoundHandler);

app.use(async (err, req, res, next) => {
  await errorHandler(err, res);
});

module.exports = app;
