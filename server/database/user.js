const _ = require('lodash')

const TABLE = 'users'

module.exports = {
  getByUsername: username => (db, cb) => {
    db.get(`select * from ${TABLE} where username=?`, username, cb)
  },
  create: (username, password, salt) => (db, cb) => {
    db.prepare(
      `insert into ${TABLE} \
      (username, password, salt, create_time ) \
      values(?, ?, ?, ?)`
    )
      .run(username, password, salt, Date.now(), cb)
      .finalize()
  }
}