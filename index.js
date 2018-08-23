const config = require('./config/env')
const express = require('express')
const path = require('path')
const PORT = config.port;
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
/*Requests */
const mongoReq = require('./src/requests/mongoReq')
mongoose.connect(config.mongourl, {
  useMongoClient: true
}, (err) => {if (err) throw err;})
mongoose.Promise = global.Promise

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: false}))
  .use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
  .use(bodyParser.json())
  .post('/oauth/log', mongoReq.log)
  .post('/oauth/registration', mongoReq.registaration)
  .post('/events', mongoReq.events)
  .listen(PORT, () => {
  	console.log(`Listening on ${ PORT }`)
  	console.log(`Mongourl : ${config.mongourl}`)
  })
