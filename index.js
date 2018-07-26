const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://anatoliy:009009q@ds247670.mlab.com:47670/daybook"
const bodyParser = require('body-parser')


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: false}))
  .use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/OAuth/Log', function (req, res) {
  let state = false;
  if(req.body.userName != "" || req.body.userPass != "") {
  let queryParams = req.body;
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const dbo = client.db("daybook");
    let data = {};
     dbo.collection("users").count(queryParams).then((count) => {
        if(count == 0){
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
          	} else {
          		console.log("User get events data, successful.")
          		dbo.collection("Content").find({"userName":queryParams.userName}).then((dbData) => {
          			data = dbData;
          			console.log(data);
          		});
          	}
          	client.close();
			console.log("Finaly result: ", state);
        	res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
        	res.end();
          });
        }
      });
    });
}
})
.post('/OAuth/registration', function (req, res) {
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
        console.log("Finaly result: ", state);
        res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass, "data": data});
        res.end();
      });
    });
})
.post('/events',function(req, res){
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
})
.post('/events/update',function(req, res){
	MongoClient.connect(url, function(err, client) {
    if (err) throw err;
     let query = req.body.data;
     let dbo = client.db("daybook");
      dbo.collection("Content").remove({user_Name: query.user_Name});
      dbo.collection("Content").insert(query);

     client.close();
    });

})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
