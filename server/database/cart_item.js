const _ = require('lodash')
const updateBind = require('./updateBind')

const TABLE = 'cart_items'

module.exports = {
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

  delete: id => (db, cb) => {
    return db
      .prepare(`delete from ${TABLE} where id=?`)
      .run(id, cb)
      .finalize()
  },

  clear: userId => (db, cb) => {
    return db
      .prepare(`delete from ${TABLE} where user_id=?`)
      .run(userId, cb)
      .finalize()
  },

  listByUser: userId => (db, cb) => {
    return db.all(`select * from ${TABLE} where user_id=?`, userId, cb)
  },

  get: id => (db, cb) => {
    return db.get(`select * from ${TABLE} where id=?`, id, cb)
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
