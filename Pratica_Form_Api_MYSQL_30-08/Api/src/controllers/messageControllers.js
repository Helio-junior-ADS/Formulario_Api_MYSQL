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

const showById = async (req,res) => {
  const {id} = req.params

  const show = await db.Messages.findByPk(id)

  return res.json(show);
}

const updatedMsg = async (req,res) => {
  const {id} = req.params;
  
   await db.Messages.update({
    nome:req.body.nome,
    email:req.body.email,
    subject:req.body.subject,
    content:req.body.content
  },{
    where:{id:id}
  }).then((showRespo)=>{
    return res.json({
      "error":false,
      "message":"Mensagem ATUALIZADA com sucesso",
      "data":showRespo
    });
  }).catch(()=>{
    return res.json({
      "error":false,
      "message":"Error:: Mensagem Não ATUALIZADA com sucesso",
    })
  })  

}

module.exports = {
  cadastro,
  getAll,
  showById,
  updatedMsg
};