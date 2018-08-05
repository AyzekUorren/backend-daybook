const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://anatoliy:009009q@ds247670.mlab.com:47670/daybook"
const bodyParser = require('body-parser')
/*Requests */
const oauth = require('./src/requests/oauth')


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
  .post('/OAuth/Log', oauth.log(req, res))
  .post('/OAuth/registration', oauth.registaration(req. res))
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
