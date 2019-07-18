// TODO: Remove afterwards
import "@babel/polyfill";
import express from 'express'
import apiRoutes from './routes';

const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send("Hello World!"));
app.use('/api', apiRoutes);

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.send('Something broke!')
})
     
module.exports = app;

