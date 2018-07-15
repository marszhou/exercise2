const _ = require('lodash')

const TABLE = 'sessions'

module.exports = {
  get: id => (db, cb) => {
    return db.get(`select * from ${TABLE} where id=?`, id, cb)
  },
  create: (id, userId) => (db, cb) => {
    return db
      .prepare(
        `insert into ${TABLE} (id, user_id, create_time) values(?, ?, ?)`
      )
      .run(id, userId, Date.now(), cb)
      .finalize()
  },
  deleteByUserId: userId => (db, cb) => {
    return db
      .prepare(`delete from ${TABLE} where user_id=?`)
      .run(userId, cb)
      .finalize()
  }
}
