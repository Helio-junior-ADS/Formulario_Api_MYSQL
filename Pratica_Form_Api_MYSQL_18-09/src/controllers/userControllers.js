const db = require("../db/models/index");

const userList = async (req, res) => {
  const { page = 1 } = req.query;

  /*  console.log(page) */

  const limit = 10;

  var lastPage = 1;

  const countUser = await db.Messages.count();
  /* console.log(countUser); */
  if (countUser !== 0) {
    lastPage = Math.ceil(countUser / limit);
    /* console.log(lastPage); */
  } else {
    return res.status(400).json({
      message: "Error: Nenhum usuário encontrado !",
    });
  }

  const users = await db.Messages.findAll({
    attributes: ["id", "nome", "email", "subject", "content"],
    order: [["id", "ASC"]],
    offset: Number(page * limit - limit),
    limit: limit,
  });

  if (users) {
    var pagination = {
      path: "/",
      page,
      prev_page_url: page - 1 >= 1 ? page - 1 : false,
      next_page_url:
        Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
      lastPage,
      total: countUser,
    };
    return res.json({
      users,
      pagination,
    });
  } else {
    return res.json({
      message: "Erro: Nenhum usuário encontrado!",
    });
  }
};

const userID = async (req, res) => {
  const { id } = req.params;

  const user = await db.Messages.findOne({
    where: { id },

    attributes: ["id", "nome", "email", "subject", "content"],
  });

  if (user) {
    return res.json({
      user: user,
    });
  } else {
    return res.status(400).json({
      message: "Error: Usuário não encontrado",
    });
  }
};

const createUser = async (req, res) => {
  const dados = req.body;

  await db.Messages.create(dados)
    .then((dadosUsuario) => {
      return res.status(200).json({
        message: "Usuário cadastrada com sucesso",
        dadosUsuario,
      });
    })
    .catch(() => {
      return res.json({
        message: "Error:: usuário não cadastrado com sucesso",
      });
    });
};

const updateUser = async (req, res) => {
  var dados = req.body;

  await db.Messages.update(dados, { where: { id: dados.id } })
    .then(() => {
      return res.json({
        message: "Usuário atualizado com SUCESSO !!!",
      });
    })
    .catch(() => {
      return res.status(400).json({
        message: "Error: Usuário NÂO atualizado com sucesso !!!",
      });
    });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await db.Messages.destroy({
    where: { id },
  })
    .then(() => {
      return res.json({
        message: "Usuário Deletado com SUCESSO !!!",
      });
    })
    .catch(() => {
      return res.status(400).json({
        message: "Error: Não foi possivel deletar o usuário",
      });
    });
};

module.exports = {
  createUser,
  userList,
  userID,
  updateUser,
  deleteUser,
};
