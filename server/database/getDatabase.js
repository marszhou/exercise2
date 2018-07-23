var sqlite3 = require('sqlite3').verbose()
const path = require('path')

module.exports = () =>
  new sqlite3.Database(path.join(__dirname, '../../data/database.db'))
