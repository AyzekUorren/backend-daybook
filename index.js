// Dependies
const timeConfig = require('./api/config/runningTime')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./api/config/swagger/swagger.yaml')
const morgan = require('morgan')
const errorHandler = require('./api/errorHandlers/errorHandler')
const mongoError = require('./api/errorHandlers/mongoHandler')

// Configure process.env
const config = require('./api/config/env')
// Connect / configure DB
mongoose.connect(config.mongourl, {
  useMongoClient: true
}, (err) => {if (err) throw err;})
mongoose.Promise = global.Promise

express()
  // Middlewares
  .use(morgan('dev'))
  .use(express.static(path.join(__dirname, 'api')))
  .use(bodyParser.urlencoded({extended: false}))
  .use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();})
  .use(bodyParser.json())
  // api docs for API
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  // Startup Time and running time of server
  .get('', timeConfig.getTimeRun)
  // Routes
  .use('/api', require('./api/routes/api'))
  .use(mongoError)
  .use(errorHandler)
  // Starting server
  .listen(config.port, () => {
  	console.log(`-> Listening on	\x1b[34m http://${ config.defaultUrl }:${ config.port }\x1b[0m`)
    console.log(`-> Api docs on	\x1b[32m http://${ config.defaultUrl }:${ config.port }/api-docs\x1b[0m`)
  	console.log(`Mongourl : ${config.mongourl}`)
  })
