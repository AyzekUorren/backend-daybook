const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const User = require('../models/user');
const url = `mongodb://anatoliy:009009q@ds247670.mlab.com:47670/daybook`;

exports.log = (req, res) => {
  	if(req.body.userName != "" && req.body.userPass != "") {
		let queryParams = req.body;
    User.findOne({
      userName: queryParams.userName,
      userPass: queryParams.userPass
    }, (err, user) => {
      if(err) throw err;
      if(user) {
        console.log("Success log.", true);
        if(user.user_Events){
          res.status(200).json({
            "state": true,
            "userName": queryParams.userName,
            "userPass": queryParams.userPass,
            "data": user.user_Events
          });
        } else {
          res.status(200).json({
            "state": true,
            "userName": queryParams.userName,
            "userPass": queryParams.userPass
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
        "data": user
      });
    } else {
      console.log("Registration success , user doesn't exist.");
      User.create(queryParams).then((user) => {
        res.status(200).json({
          "state": true,
          "userName": req.body.userName,
          "userPass": req.body.userPass,
          "data": user
        });
      });
    };
  });
} else {
  res.status(422).send({error: "miss name or pass"});
}
};

exports.events = (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
     let query = req.body.data;
     let dbo = client.db("daybook");
      dbo.collection("Content").remove({
        user_Name: query.user_Name,
      });
      dbo.collection("Content").insert(query);

     client.close();
    });
    res.json(req.body);
    res.end();
};

exports.eventsUpdate = (req, res) => {
	MongoClient.connect(url, (err, client) => {
    if (err) throw err;
     let query = req.body.data;
     let dbo = client.db("daybook");
      dbo.collection("Content").remove({
        user_Name: query.user_Name,
      });
      dbo.collection("Content").insert(query);

     client.close();
    });

};
