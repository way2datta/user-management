const express = require('express')
const app = express()
const indexRouter = require(__dirname+'/routes');

app.use('/api', indexRouter);

module.exports = app;

