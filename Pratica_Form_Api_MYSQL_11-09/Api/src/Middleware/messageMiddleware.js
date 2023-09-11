const validateNome = (req,res,next) => {
  const {body} = req;

  if(body.nome === undefined) {
    return res.status(400).json({"message":"Campo 'Nome' OBRIGADOTÓRIO"})
  }
  if(body.nome === '') {
    return res.status(400).json({"message":"Campo 'Nome' Não pode está vazio"})
  }
  next();
}
const validateEmail = (req,res,next) => {
  const {body} = req;

  if(body.email === undefined) {
    return res.status(400).json({"message":"Campo 'E-mail' OBRIGADOTÓRIO"})
  }
  if(body.email === '') {
    return res.status(400).json({"message":"Campo 'E-mail' Não pode está vazio"})
  }
  next();
}
const validateSubject = (req,res,next) => {
  const {body} = req;

  if(body.subject === undefined) {
    return res.status(400).json({"message":"Campo 'Assunto' OBRIGADOTÓRIO"})
  }
  if(body.subject === '') {
    return res.status(400).json({"message":"Campo 'Assunto' Não pode está vazio"})
  }
  next();
}
const validateContent = (req,res,next) => {
  const {body} = req;

  if(body.content === undefined) {
    return res.status(400).json({"message":"Campo 'Conteúdo' OBRIGADOTÓRIO"})
  }
  if(body.content === '') {
    return res.status(400).json({"message":"Campo 'Conteúdo' Não pode está vazio"})
  }
  next();
}

module.exports = {
  validateNome,
  validateEmail,
  validateSubject,
  validateContent
}