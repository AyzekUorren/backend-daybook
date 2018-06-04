const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"
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
  .get('/', function (req, res){
  res.send('Welcome Done!');
})
.post('/OAuth/Log', function (req, res) {
  let state = false;
  if(req.body.userName != "" || req.body.userPass != "") {
  let queryParams = req.body;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     let dbo = db.db("DayBook");
     dbo.collection("users").count(queryParams).then((count) => {
        console.log(count);
        if(count == 0){
          console.log("Miss");
        } else { 
          state = true; 
          console.log("True!");
        }
        db.close();
        console.log(state);
        res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass});
        res.end();
      });
    });
}
})
.post('/OAuth/registration', function (req, res) {
  console.log(res.body);
  let state = true;
  let queryParams = req.body;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     let dbo = db.db("DayBook");
     dbo.collection("users").count({"userName": queryParams.userName}).then((count) => {
        console.log(count);
        if(count == 0){
          console.log("true");
          dbo.collection("users").insert({"userName": queryParams.userName, "userPass" : queryParams.userPass});
        } else { 
          state = false; 
          console.log("false!");
        }
        db.close();
        console.log(state);
        res.json({"state": state, "userName": req.body.userName, "userPass": req.body.userPass});
        res.end();
      });
    });
})
.post('/events',function(req, res){
  console.log(req.body.data);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
      let dbo = db.db("DayBook");
     let query = req.body.data;
      dbo.collection("Content").remove({user_Name: query.user_Name});
      dbo.collection("Content").insert(query);

     db.close();
    });
    res.json(req.body);
    res.end();
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
