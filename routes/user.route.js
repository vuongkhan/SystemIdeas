const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const middleware=require('./../helpers/middleware');

// POST /users
router.post('/', userController.createUser);

// GET /users
router.get('/', userController.getUsers);

router.get('/:userId', userController.getUserById);

// PUT /users/:id
router.put('/:id', userController.updateUser);

// DELETE /users/:id
router.delete('/:id', userController.deleteUser);

//get total user in department
router.get('/getalluser/:department', userController.getTotalUserDepartment);
//get user in department
router.get('/users/:department', userController.getUserDepartment);
//get total idea in department
router.get('/idea/:department', userController.getTotalIdeaByDepartment);
//get total user today
router.get('/totaluser/:department', userController.getTotalIdeasToday);
module.exports = router;