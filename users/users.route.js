const userController = require('./users.controller');
const express = require('express');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;