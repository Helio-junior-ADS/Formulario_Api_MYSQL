 const db = require('../db/models');



 const userList = async (req,res) => {
  const { page = 1 } = req.query;

  const limit = 10
  var lastPage = 1
  const countUser = await db.usuarios.count();
  
  if (countUser !== 0) {
    lastPage = Math.ceil(countUser / limit)
  } else {
    return res.status(400).json({
      message : "Usuário não encontrado"
    });
  };

  const users = await db.usuarios.findAll({
    attributes: ['id','nome','email','content','subject'],
    order:[['id','ASC']],
    offset: Number((page * limit) - limit),
    limit:limit
  });

  if( users ) {
    var pagination = {    
      path : '/users',  
      page,
      prev_page_url : page - 1 >= 1  ? page - 1 : false,
      next_page_url : Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
      lastPage,
      total : countUser 
    }
    return res.json({
      users,
      pagination
    })
  } else {
    return res.status(400).json({
      message : "Error: Usuário não encontrado"
    });
  }
 }

 const idByPkUser = async (req,res) => {
  const {id} = req.params;
  const user = await db.usuarios.findOne({where:{id:id}})
  if ( user ){
    return res.json({
      user
    });    
  } else {
    return res.status(400).json({
      message: "Error::Usuário não encontrado"
    });
  };
 };

const userCreate = async (req,res) => {
  const dados = req.body;
 
  await db.usuarios.create(dados).then((response)=>{
    return res.json({
      message : "Usuário criado com sucesso",
      dados:response
    });
  }).catch(()=>{
    return res.json({
      message : "Error::Usuário não foi criado com sucesso"
    });
  }) 

};

const updateUsers = async (req,res) => {
  const dados = req.body;
   await db.usuarios.update(dados,{ where:{id:dados.id}} ).then(() => {
    return res.json({
      message: "Usuário atualizado com sucesso"
    });
   }).catch((err) => {
    return res.status(400).json({
      message:"Error:Usuário não atualizado !!!",
      error:err
    });
   });
 }

 const deleteUsers = async (req,res) => {
  const {id} = req.params;

   const user = await db.usuarios.destroy({where:{id:id}})
    if(user) {
      return res.json({
        message: "Usuário apagado com sucesso !!!"
      })
    } else {
      return res.status(400).json({
        message : "Error::Usuário não encontrado"
      })
    }
  
  }

module.exports = {
  userCreate,
  userList,
  idByPkUser,
  updateUsers,
  deleteUsers
}

