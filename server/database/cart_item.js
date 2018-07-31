const _ = require('lodash')

const TABLE = 'cart_items'

module.exports = {
  ...require('./mixins')(TABLE),

  create: (userId, itemId, number) => (db, cb) => {
    return db
      .prepare(
        `insert into ${TABLE} (user_id, item_id, number) values(?, ?, ?)`
      )
      .run(userId, itemId, number, cb)
      .finalize()
  },

  update: (id, number) => (db, cb) => {
    return db
      .prepare(`update ${TABLE} set number=? where id=?`)
      .run(number, id, cb)
      .finalize()
  },

  clear: userId => (db, cb) => {
    return db
      .prepare(`delete from ${TABLE} where user_id=?`)
      .run(userId, cb)
      .finalize()
  },

  getItemByUser: (userId, itemId) => (db, cb) => {
    return db.get(
      `select * from ${TABLE} where user_id=? and item_id=?`,
      userId,
      itemId,
      cb
    )
  }
}
