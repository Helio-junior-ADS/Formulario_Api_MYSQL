const db = require('../db/models/index')


const cadastro = async (req,res) => {
  
  const data = req.body

  await db.Messages.create(data)
  .then((dataMensagen)=>{
    return res.json({
      "error":false,
      "messagem":"Mensagem cadastrada com sucesso",
      "data" : dataMensagen
    });
  }).catch(() => {
    return res.json({
      "error":false,
      "messagem":"Error:: Mensagem não cadastrada com sucesso"      
    });
  })

}

const getAll = async (req,res) => {

  await db.Messages.findAll().then((dataMensagen) => {
    return res.json(dataMensagen)
  }).catch(() => {
    return res.json({"message":"Error"})
  })
}

module.exports = {
  cadastro,
  getAll
}