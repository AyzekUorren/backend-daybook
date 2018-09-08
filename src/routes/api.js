const express = require ('express');
const router = express.Router();
const userController = require('../controller/user')

router
.post('/user/oauth', userController.oauth)
.post('/user/signup', userController.signup)
.get('/user/:id/events', userController.events)


module.exports = router;
