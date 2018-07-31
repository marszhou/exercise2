const _ = require('lodash')

const TABLE = 'blogs'

module.exports = {
  ...require('./mixins')(TABLE),

  create: (userId, title, content) => (db, cb) => {
    return db
      .prepare(
        `insert into ${TABLE} \
        (user_id, title, content, create_time) \
        values(?, ?, ?, ?)`
      )
      .run(userId, title, content, Date.now(), cb)
      .finalize()
  },
}
