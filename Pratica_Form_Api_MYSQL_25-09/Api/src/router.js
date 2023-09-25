const express = require('express');
const usersControllers = require('./controllers/usersControllers');

const router = express.Router();

router.post('/users', usersControllers.userCreate);
router.get('/users', usersControllers.userList);
router.get('/users/:id', usersControllers.usersByPk);
router.put('/users', usersControllers.userUpdate);
router.delete('/users/:id', usersControllers.usersDelete);

module.exports = router;