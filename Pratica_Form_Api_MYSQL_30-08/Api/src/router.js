const express = require('express');
const messageControllers = require('./controllers/messageControllers');

const router = express.Router();

router.post('/message', messageControllers.cadastro);
router.get('/message', messageControllers.getAll);

module.exports = router;