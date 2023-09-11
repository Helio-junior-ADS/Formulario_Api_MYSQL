const express = require('express');
const messagesControllers = require('./controllers/messagesControllers');
const messageMiddleware = require('./Middleware/messageMiddleware');

const router = express.Router();

router.post('/message',messageMiddleware.validateNome,messageMiddleware.validateEmail,messageMiddleware.validateSubject,messageMiddleware.validateContent,messagesControllers.createMessages );
router.get('/message',messagesControllers.showMessage);
router.get('/message/:id',messagesControllers.showByPk);
router.put('/message/:id',messagesControllers.updateMessage);
router.delete('/message/:id',messagesControllers.deleteMessage);

module.exports = router;