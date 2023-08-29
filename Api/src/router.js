const express = require('express');
const message = require('./controllers/message');

const router = express.Router();

router.post('/message', message.cadastro);
router.get('/message', message.getAll);

module.exports = router;