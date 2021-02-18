const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller');

route.get('/', userController.getAllUsers);
route.get('/:id', userController.getUserById);
route.post('/login', userController.getUserByName);
route.post('/', userController.createUser);
route.put('/:id', userController.updateUser);
route.delete('/:id', userController.deleteUser);

module.exports = route;