const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const User = require('../models/user');
const url = `mongodb://anatoliy:009009q@ds247670.mlab.com:47670/daybook`;

// exports.log = function (req, res) {
//   	let state = false;
//   	if(req.body.userName != "" || req.body.userPass != "") {
// 		let queryParams = req.body;
// 		MongoClient.connect(url, function(err, client) {
// 			if (err) throw err;
// 			const dbo = client.db("daybook");
// 			let data = {};
// 			dbo.collection("users").count(queryParams).then((count) => {
// 				if(count == 0){
// 					client.close();
// 					console.log("Fail log.");
// 					res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
// 					res.end();
// 				} else {
// 					state = true;
// 					console.log("Success log.");
// 					dbo.collection("Content").count({"userName":queryParams.userName}).then((count) => {
// 						console.log(count);
// 						if(count == 0){
// 							console.log("User does not have events data.");
// 							client.close();
// 							console.log("Finally result: ", state);
// 							res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
// 							res.end();
// 						} else {
// 							console.log("User get events data, successful.")
// 							dbo.collection("Content").findOne({"userName":queryParams.userName}, function(err, result){
// 								if(err) throw err;
//
// 								data = result.userEvents;
// 								client.close();
// 								console.log("Finally result: ", state);
// 								res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
// 								res.end();
// 							});
// 						}
//
// 					});
// 				}
// 			});
// 		})
// 	}
// };

exports.log = function (req, res) {
  	if(req.body.userName != "" || req.body.userPass != "") {
		let queryParams = req.body;
    User.findOne({userName: queryParams.userName, userPass: queryParams.userPass}, function(err, user){
      if(err) throw err;
      if(user) {
        console.log("Success log.", true);
        res.status(200).json({"state": true, "userName": queryParams.userName, "userPass": queryParams.userPass, "data": user});
      }
      else {
        console.log("Fail log.", false);
        res.status(200).json({"state": false, "userName": queryParams.userName, "userPass": queryParams.userPass, "data": user});
      }
    });
	};
};

exports.registaration = function (req, res) {
  let state = true;
  let queryParams = req.body;
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const dbo = client.db("daybook");
    let data = null;
     dbo.collection("users").count({"userName": queryParams.userName}).then((count) => {
        if(count == 0){
          console.log("Registration success , user doesn't exist.");
          dbo.collection("users").insert({"userName": queryParams.userName, "userPass" : queryParams.userPass});
        } else {
          state = false;
          console.log("Failed, user already exists.");
        }
        client.close();
        console.log("Finally result: ", state);
        res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
        res.end();
      });
    });
};

exports.events = function(req, res){
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
     let query = req.body.data;
     let dbo = client.db("daybook");
      dbo.collection("Content").remove({user_Name: query.user_Name});
      dbo.collection("Content").insert(query);

     client.close();
    });
    res.json(req.body);
    res.end();
};

exports.eventsUpdate = function(req, res){
	MongoClient.connect(url, function(err, client) {
    if (err) throw err;
     let query = req.body.data;
     let dbo = client.db("daybook");
      dbo.collection("Content").remove({user_Name: query.user_Name});
      dbo.collection("Content").insert(query);

     client.close();
    });

};
