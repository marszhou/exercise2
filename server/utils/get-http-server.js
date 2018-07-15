'use strict'

let fs = require('fs')
let http = require('http')
let logger = require('./logger').getLogger()

module.exports = function(app, config) {
  let server = http.createServer(app)
  server.listen((config && config.port) || 8080, function() {
    let address = server.address()
    logger.info(
      'http server listening: ' + address.address + ':' + address.port
    )
  })
  return server
}
