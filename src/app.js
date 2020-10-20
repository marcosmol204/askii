const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

const path = require('path');
const { ErrorFactory } = require('../utils/errorFactory');

// const adminRouter = require('../components/admin/adminRouter');

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
});

// app.use('/api/v1/admin', adminRouter);

app.use((req, res, next) => next(new ErrorFactory(404, 'The requested resource is not found')));

app.use((error, req, res, next) => {
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
