const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/env').secret;
const productName = require('../config/env').name;

module.exports = {
  signin: async (req, res, next) => {
  	try {
      const { email, password, name } = req.body;
      let newUser = new User ({ email, password, name });
      return await newUser.save( (err, user) => {
        if (err) return err;
        
        console.debug(`Success: user created\n${user.id}`);
        const access_token = jwt.sign({
          iss: productName,
          sub: user.id,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 1)
        }, secret);
  
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
    if(req.body.userName != "" && req.body.userPass != ""){
    let queryParams = req.body;
    console.log(queryParams);
    User.findOne({
      userName: queryParams.userName
    }, (err, user) => {
      if(err) throw err;
      if(user){
        console.log("Failed, user already exists.");
        res.status(409).json({
          "state": false,
          error: `Failed, user already exists.`,
        });
      } else {
        console.log("Registration success , user doesn't exist.");
        User.create(queryParams).then((user) => {
          res.status(201).json({
            "state": true,
            "success": `Registration was success`,
          });
        });
      };
    });
  } else {
    res.status(422).send({error: "miss name or pass"});
  }
  },
  events: async (req, res, next) => {
    const _id = req.query.id;
    User.findOne({_id})
    .then((result) => {
      res.status(200).json({result, state: true,});
    })
    .catch((err) => {
      if(err) throw err;
    });
  },
}