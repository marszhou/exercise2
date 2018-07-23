var path = require('path')
var log4js = require('log4js')

var ROOT_DIR = path.join(__dirname, '../')
var LOG_DIR = path.join(ROOT_DIR, '../data/logs/')
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: LOG_DIR + 'application.log' }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' }
  }
})

module.exports = log4js
