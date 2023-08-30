const db = require('../models/index');

const cadastro = async (req, res) => {
  const dados = await req.body;

  await db.Messages.create(dados).then((showResponse)=>{
   return res.json({
      error: false,
      message: "Cadastro realizado com sucesso!.",
      dados: showResponse,
    })
  }).catch(()=>{
    return res.json({
      error: false,
      message: "Error:: Cadastro não realizado com sucesso!."
      
    });
  })
 
};

const getAll = async (req,res) => {

  const show = await db.Messages.findAll();

  return res.json(show);
}


module.exports = {
  cadastro,
  getAll
};