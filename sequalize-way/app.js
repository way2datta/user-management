const express = require('express')
const app = express()
const indexRouter = require(__dirname+'/routes');

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', indexRouter);

module.exports = app;

