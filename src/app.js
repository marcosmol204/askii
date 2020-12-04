const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();
const app = express();
require('../utils/proc-man');

const path = require('path');
const { ErrorFactory } = require('../utils/errorFactory');

const { apiRouter } = require('../components/api');
const { authRouter } = require('../components/auth');

app.use(cors())

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);

app.use((req, res, next) => next(new ErrorFactory(404, 'The requested resource is not found')));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.json({
    error: {
      status: error.status,
      name: error.name,
      message: error.message,
    },
  });
});

module.exports = app;
