const cors = require('cors');
const app = require('../app');

export const Aut = (req,res,next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  app.use(cors());
  next()
};


