const db = require('../db/models/index');

const createMessages = async (req,res) => {
  const {body} = req;

   await db.Messages.create(req.body).then((showResponse)=>{
    return res.json({
      "error":false,
      "message":"Mensagem criada com sucesso !!!",
      "dados":showResponse
    });
   }).catch(()=>{
    return res.json({
      "error":false,
      "message":"Error:: Mensagem não foi criada com sucesso !!!"
    });
   });
};

const showMessage = async (req,res) => {
  const show = await db.Messages.findAll();
  return res.status(200).json(show);
}

const showByPk = async (req,res) => {
  const {id} = req.params;

  const show = await db.Messages.findByPk(id);
  return res.status(200).json(show);
};

const updateMessage = async (req,res) => {
  const {id} = req.params;
  const {nome,email,subject,content} = req.body;
  
  await db.Messages.update({
    nome:nome,
    email:email,
    subject:subject,
    content:content
  },{
    where:{id:id}
  });
  const show = await db.Messages.findByPk(id);
  return res.status(200).json(show);
}

const deleteMessage = async (req,res) => {
  const {id} = req.params;  
  const show = await db.Messages.findAll();
  await db.Messages.destroy({where:{id:id}}).then(()=>{   
    return res.status(201).json({
      "message":"Messagem excluida com SUCESSO !!!",
      "dados":show
    });
  }).catch((err)=>{
    return res.status(201).json({
      "message": err
    });
  })
 
}

module.exports = {
  createMessages,
  showMessage,
  showByPk,
  updateMessage,
  deleteMessage
};