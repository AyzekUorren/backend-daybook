const router = require('express-promise-router')()
const userController = require('../controllers/user')
const passport = require('passport')
const passportConf = require('../passport')

router
.post('/user/signup', userController.signUp)
.post('/user/signin', userController.emailToLowerCase, passport.authenticate('local', { session: false }), userController.signIn)
.get('/user/me', passport.authenticate('jwt', { session: false }), userController.getUser)
.get('/user/events', passport.authenticate('jwt', { session: false }), userController.events)
.post('/user/events', passport.authenticate('jwt', { session: false }), userController.createEvent)


module.exports = router;