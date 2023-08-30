const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  app.use(cors);
  next()
})

app.use(router);

module.exports = app;