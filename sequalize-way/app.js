const express = require('express')
const app = express()
const indexRouter = require(__dirname+'/routes');
const bodyParser = require('body-parser');

 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send("Hello World!"));
app.use('/api', indexRouter);


module.exports = app;

