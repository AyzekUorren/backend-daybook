const User = require('../models/user');
const Event = require('../models/event')
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
  signUp: async (req, res, next) => {
  	try {
      console.log(`<= `, req.body);
      const { email, password, name } = req.body;
      let newUser = new User ({ email, password, name });
      return await newUser.save( (err, user) => {
        if (err) return err;
        
        const access_token = createToken(user);
        console.log(`=> `, access_token);
        res.json({ access_token });
      });
    } catch(error) {
      next(error);
    }
  },
  signIn: async (req, res, next) => {
    console.log(`<= `, req.body);
    const access_token = createToken(req.user);
    console.log(`=> `, access_token);
    res.json({ access_token });
  },
  getUser: async(req, res, next) => {
    console.log(`<= `, req.body);
    const { _id, email, name } = req.user;
    const user = { _id, email, name };
    console.log(`=> `, user);
    
    res.status(200).json(user);
  },
  events: async (req, res, next) => {
    console.log(`<= `, req.body);
    const events = await Event.find({ owner: req.user.id });

    console.log('=> ', events);
    res.json({ events });
  },
  emailToLowerCase: async (req, res, next) => {
    req.body.email = await req.body.email.toLowerCase();
    next();
  },
  createEvent: async (req, res, next) => {
    try {
    const { startTime, endTime, allDay, type } = req.body;
    const owner = req.user.id;
    const options = { startTime, endTime, allDay , type, owner};
    console.log(`<= `, req.body);
    let newEvent = new Event( options );

    return newEvent.save((err, event) => {
      if (err) return err;
      
      console.log('=> ', event);
      res.status(200).json( event );
    });
  } catch(error) {
    next(error);
  }

  }
}