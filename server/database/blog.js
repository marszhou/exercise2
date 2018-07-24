const _ = require('lodash')
const updateBind = require('./updateBind')

const TABLE = 'blogs'

module.exports = {
  get: id => (db, cb) => {
    return db.get(`select * from ${TABLE} where id=?`, id, cb)
  },
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
  update: (id, props) => (db, cb) => {
    const bind = updateBind(props)
    return db
      .prepare(`update ${TABLE} set ${bind[0]} where id=?`)
      .run([...bind[1], id], cb)
      .finalize()
  },
  delete: id => (db, cb) => {
    return db
      .prepare(`delete from ${TABLE} where id=?`)
      .run(id, cb)
      .finalize()
  },
  listByUser: (userId, offset, length) => (db, cb) => {
    return db.all(
      `select * from ${TABLE} \
      where user_id=? \
      limit ${offset}, ${length}`,
      userId,
      cb
    )
  },
  countByUser: userId => (db, cb) => {
    const { rc } = db.get(
      `select count(*) as rc from ${TABLE} where user_id=?`,
      userId,
      cb
    )
    return rc
  },
  list: (offset, length) => (db, cb) => {
    return db.all(
      `select * from ${TABLE} \
      limit ${offset}, ${length}`,
      cb
    )
  },
  count: () => (db, cb) => {
    const { rc } = db.get(`select count(*) as rc from ${TABLE} `, cb)
    return rc
  }
}
