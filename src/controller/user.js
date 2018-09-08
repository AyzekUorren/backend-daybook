const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.oauth = (req, res) => {
  	if(req.body.userName != "" && req.body.userPass != "") {
		let queryParams = req.body;
    User.findOne({
      userName: queryParams.userName,
      userPass: queryParams.userPass,
    }, (err, user) => {
      if(err) throw err;
      if(user) {
        console.log("Success log.", true);
        if(user.user_Events){
          res.status(200).json({
            "state": true,
            "userName": queryParams.userName,
            "userPass": queryParams.userPass,
            "data": user.user_Events,
          });
        } else {
          res.status(200).json({
            "state": true,
            "userName": queryParams.userName,
            "userPass": queryParams.userPass,
          });
        }
      }
      else {
        console.log("Fail log.", false);
        res.status(401).json({error: "Bad name or pass"});
      }
    });
	} else {
    res.status(422).json({error: "miss name or pass"});
  }
};

exports.signup = (req, res) => {
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
};

exports.events = (req, res) => {
  const _id = req.query.id;
  User.findOne({_id})
  .then((result) => {
    res.status(200).json({result, state: true,});
  })
  .catch((err) => {
    if(err) throw err;
  });
};
