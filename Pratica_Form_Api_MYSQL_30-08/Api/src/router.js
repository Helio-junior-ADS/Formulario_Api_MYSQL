const express = require('express');
const messageControllers = require('./controllers/messageControllers');

const router = express.Router();

router.post('/message', messageControllers.cadastro);
router.get('/message', messageControllers.getAll);
router.get('/message/:id', messageControllers.showById);
router.put('/message/:id', messageControllers.updatedMsg);

module.exports = router;