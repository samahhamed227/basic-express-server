'use strict';

const express = require('express');
require('dotenv').config();

const app = express();

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const validatorMiddleware = require('./middleware/validator');
const loggerMiddleware = require('./middleware/logger');
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.status(200).send('Hello this is home root 😁');
});


app.get('/person', validatorMiddleware, (req, res) => {
    res.send(`Hello >>>>> ✋, ${req.validator}`)
});

app.get('/bad', (req, res, next) => {
    next('error from bad end point');
});

app.put('/bad', (req, res) => {
  res.status(200).send(' This is a put request!');
});

app.get ('/status',(req,res)=>{
  res.send({
    domain:'basic-express-serv.herokuapp.com',
    status:'running',
    port:'3000',
  });
});


// this is a global middleware
app.use('*', notFoundHandler);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}


module.exports = {
  server: app,
  start: start
}