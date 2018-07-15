'use strict'

const getHttpServer = require('./utils/get-http-server')
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('./utils/logger').getLogger()
logger.level = 'debug'
const db = require('./database')

let httpServer = getHttpServer(app)

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  logger.info(req.method + ': ' + req.originalUrl)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method'
  )
  next()
})

require('./http/account')(app, db)
require('./http/item')(app, db)