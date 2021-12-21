const express = require('express');
const fs = require('fs');
const app = express();

const index = require('./routes/index');
const candidateRoute = require('./routes/candidateRoute');
const errors = require('./errors/index');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errors.errorHandler)

app.use('/', index)
app.use('/candidate', candidateRoute)

module.exports = app;