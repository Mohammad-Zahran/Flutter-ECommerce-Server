const express = require('express')
const router = express.Router();

const userController = require('../controllers/user.controller.js');

router.get('/',userController.getAllUsers);
router.post('/register',userController.Register);
router.post('/login', userController.Login);
router.put('/:id', userController.UpdateUser);
router.delete('/:id',userController.DeleteUser);

module.exports = router;