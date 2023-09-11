const app = require('./app');
const db = require('./db/models/index')

app.listen(3333,()=>{
  console.log(`SERVER ONLINE NA PATH http://localhost:3333`);
});