const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const pino = require('pino-http')();

const { errorHandler, notFoundHandler } = require('../utils/errors/errorHandler');

const app = express();
dotenv.config();
require('../utils/errors/proc-man')();

const { apiRouter } = require('../components/api');
const { authRouter } = require('../components/auth');

app.use(pino);
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(helmet());

app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);
app.use(notFoundHandler);

app.use(async (err, req, res, next) => {
  await errorHandler(err, res);
});

module.exports = app;
