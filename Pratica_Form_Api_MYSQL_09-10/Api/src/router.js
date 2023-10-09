const express = require('express');
const usersControllers = require('./controllers/usersControllers');

const router = express.Router();

router.post('/users', usersControllers.userCreate);
router.get('/users', usersControllers.userList);
router.get('/users/:id', usersControllers.idByPkUser);
router.put('/users', usersControllers.updateUsers);
router.delete('/users/:id', usersControllers.deleteUsers);

module.exports = router;