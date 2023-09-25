const db = require('../db/models');


const userList = async (req,res) => {
  const { page = 1 } = req.query;

  const limit = 10;

  var lastPage = 1

  const usersCont = await db.usuarios.count();

  if ( usersCont != 0 ) {
    lastPage = Math.ceil(usersCont / limit);
  } else {
    return res.status(400).json({
      message:"Usuário não encontrado !!!!"
    })
  }

  const users = await db.usuarios.findAll({
    attributes:['id','nome','email','subject','content'],
    order:[['id', 'ASC']],
    offset: Number((page * limit) - limit),
    limit: limit
  });

  if ( users ) {

    const pagination = {
      path :'/',
      page,
      prev_url_page : page - 1 >= 1 ? page - 1 : false,
      next_url_page : Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
      lastPage,
      total: usersCont
    }

    return res.json({
      users,
      pagination
    });

  } else {

    return res.status(400).json({
      message:"Error:: Nenhum usuário encontrado"
    });

  };

};

const usersByPk = async (req,res) => {
  const {id} = req.params;
  
  const users = await db.usuarios.findOne({

    attributes:['id','nome','email','subject','content'],
    where:{id:id}

  })

  if ( users ) {

    return res.json({
      message: 'Usuário encontrado com SUCESSO !!!',
      data:users
    });
  } else {

    return res.status(400).json({
      message:"Error:: Usuário não encontrado"
    });
  }; 
 
};

const userCreate = async (req,res) => {
  const dados = req.body;

  await db.usuarios.create(dados).then((response)=>{

    return res.json({
      message: "Usuário cadastro com sucesso !!!",
      data: response
    });

  }).catch((err)=>{

    return res.status(400).json({
      message:"Error:: Usuário NÃO cadastro com sucesso !!!", err
    });

  })

}

const userUpdate = async (req,res) => {
  const dados = req.body

  await db.usuarios.update(dados,
    {
      where:{id:dados.id}
    }).then(()=>{

      return res.json({
        message: 'Usuário ATUALIZADO com sucesso !!!'
      });
    }).catch((err)=>{

      console.log('Error:: Usuário não atualizado com sucesso !!!!', err)
    });
 
};

const usersDelete = async (req,res) => {
  const {id} = req.params;

  const users = await db.usuarios.destroy({where:{id:id}});

  if (users) {
    return res.json({
      message:"Usuário REMOVIDO com sucesso !!!!"
    })
  } else {
    return res.status(400).json({
      message:"Error:: Usuário não encontrado"
    });
  };
 
};

module.exports = {
  userCreate,
  userList,
  usersByPk,
  userUpdate,
  usersDelete
}