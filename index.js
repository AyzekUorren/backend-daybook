const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
/*Requests */
const mongoReq = require('./src/requests/mongoReq')


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: false}))
  .use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
.mongoose.connect(`mongodb://${procces.env.DB_USER}:${procces.env.DB_PASSWORD}@ds247670.mlab.com:47670/daybook`, {
  useMongoClient: true
})
.mongoose.Promise = global.Promise
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/OAuth/Log', mongoReq.log)
  .post('/log2', mongoReq.log2)
  .post('/OAuth/registration', mongoReq.registaration)
  .post('/events', mongoReq.events)
  .post('/events/update', mongoReq.eventsUpdate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
