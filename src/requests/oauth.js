exports.log = function (req, res) {
  	let state = false;
  	if(req.body.userName != "" || req.body.userPass != "") {
		let queryParams = req.body;
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			const dbo = client.db("daybook");
			let data = {};
			dbo.collection("users").count(queryParams).then((count) => {
				if(count == 0){
					client.close();
					console.log("Fail log.");
					res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
					res.end();
				} else { 
					state = true; 
					console.log("Success log.");
					dbo.collection("Content").count({"userName":queryParams.userName}).then((count) => {
						console.log(count);
						if(count == 0){
							console.log("User does not have events data.");
							client.close();
							console.log("Finally result: ", state);
							res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
							res.end();
						} else {
							console.log("User get events data, successful.")
							dbo.collection("Content").findOne({"userName":queryParams.userName}, function(err, result){
								if(err) throw err;
								
								data = result.userEvents;
								client.close();
								console.log("Finally result: ", state);
								res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
								res.end();
							});
						}
					  
					});
				}
			});
		})
	}
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