const _ = require('lodash')

const TABLE = 'users'

module.exports = {
  ...require('./mixins')(TABLE),

  getByUsername: username => (db, cb) => {
    db.get(`select * from ${TABLE} where username=?`, username, cb)
  },
  create: (username, password, salt, gender) => (db, cb) => {
    db.prepare(
      `insert into ${TABLE} \
      (username, password, salt, gender, create_time ) \
      values(?, ?, ?, ?, ?)`
    )
      .run(username, password, salt, gender, Date.now(), cb)
      .finalize()
  }
}
