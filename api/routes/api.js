const router = require('express-promise-router')()
const userController = require('../controllers/user')

router
.post('/user/signin', userController.signin)
.post('/user/signup', userController.signup)
.get('/user/:id/events', userController.events)


module.exports = router;
