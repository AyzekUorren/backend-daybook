const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/env').secret;
const productName = require('../config/env').name;

createToken = user => jwt.sign({
  iss: productName,
  sub: user.id,
  iat: new Date().getTime(),
  exp: new Date().setDate(new Date().getDate() + 1)
}, secret)

module.exports = {
  signin: async (req, res, next) => {
  	try {
      const { email, password, name } = req.body;
      let newUser = new User ({ email, password, name });
      return await newUser.save( (err, user) => {
        if (err) return err;
        
        console.debug(`Success: user created`);
        const access_token = createToken(user);
  
        res.json({
          user: 'created',
          access_token
        });
      });
    } catch(error) {
      next(error);
    }
  },
  signup: async (req, res, next) => {
    console.debug('signup');
  },
  events: async (req, res, next) => {
    console.debug('events');
    res.json({msg: 'events'});
  },
}