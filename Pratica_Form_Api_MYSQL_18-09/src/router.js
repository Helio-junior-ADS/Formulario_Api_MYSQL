const express = require('express');
const userControllers = require('./controllers/userControllers');

const router = express.Router();

router.post('/users', userControllers.createUser);
router.get('/users', userControllers.userList);
router.get('/users/:id', userControllers.userID);
router.put('/users', userControllers.updateUser);
router.delete('/users/:id', userControllers.deleteUser);

module.exports = router;