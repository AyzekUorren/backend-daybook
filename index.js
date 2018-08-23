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
})
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
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/OAuth/Log', mongoReq.log)
  .post('/OAuth/registration', mongoReq.registaration)
  .post('/events', mongoReq.events)
  .post('/events/update', mongoReq.eventsUpdate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
