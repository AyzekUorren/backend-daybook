const config = require('./config/env')
const timeConfig = require('./api/config/runningTime')
const express = require('express')
const path = require('path')
const PORT = config.port;
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml')
/*Requests */
mongoose.connect(config.mongourl, {
  useMongoClient: true
}, (err) => {if (err) throw err;})
mongoose.Promise = global.Promise

express()
  .use(express.static(path.join(__dirname, 'api')))
  .use(bodyParser.urlencoded({extended: false}))
  .use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();})
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .get('', timeConfig.getTimeRun)
  .use('/api', require('./src/routes/api'))
  .listen(PORT, () => {
  	console.log(`-> Listening on	\x1b[34m http://localhost:${ PORT }\x1b[0m`)
    console.log(`-> Api docs on	\x1b[32m http://localhost:${ PORT }/api-docs\x1b[0m`)
  	console.log(`Mongourl : ${config.mongourl}`)
  })
