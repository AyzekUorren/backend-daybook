const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const { User: User, Events: Events } = require('../models/user');

exports.log = (req, res) => {
    console.log(`web(post): log`);
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
        res.status(200).json({"state": false});
      }
    });
	} else {
    res.status(422).send({error: "miss name or pass"});
  }
};

exports.registaration = (req, res) => {
  console.log(`web(post): registaration`);
  if(req.body.userName != "" && req.body.userPass != ""){
  let queryParams = req.body;
  console.log(queryParams);
  User.findOne({
    userName: queryParams.userName
  }, (err, user) => {
    if(err) throw err;
    if(user){
      console.log("Failed, user already exists.");
      res.status(200).json({
        "state": false,
        "userName": req.body.userName,
        "userPass": req.body.userPass,
        "data": user,
      });
    } else {
      console.log("Registration success , user doesn't exist.");
      User.create(queryParams).then((user) => {
        res.status(200).json({
          "state": true,
          "userName": req.body.userName,
          "userPass": req.body.userPass,
          "data": user,
        });
      });
    };
  });
} else {
  res.status(422).send({error: "miss name or pass"});
}
};

exports.events = (req, res) => {
  console.log(`web(post): events`);
  const user_Events = req.body.user_Events;
  User.findOneAndUpdate(req.body.userName, {user_Events}, { new: true })
  .then((result) => {
    res.status(200).json({result, state: true,});
  })
  .catch((err) => {
    if(err) throw err;
  });
};
