const router = require('express-promise-router')()
const userController = require('../controllers/user')
const passport = require('passport')
const passportConf = require('../passport')

router
.post('/user/signin', userController.signin)
.post('/user/signup', userController.signup)
.get('/user/events', passport.authenticate('jwt', { session: false }), userController.events)


module.exports = router;
