const updateBind = require('./updateBind')

module.exports = TABLE => ({
  delete: id => (db, cb) => {
    return db
      .prepare(`delete from ${TABLE} where id=?`)
      .run(id, cb)
      .finalize()
  },
  update: (id, props) => (db, cb) => {
    const bind = updateBind(props)
    return db
      .prepare(`update ${TABLE} set ${bind[0]} where id=?`)
      .run([...bind[1], id], cb)
      .finalize()
  },
  all: () => (db, cb) => {
    return db.all(`select * from ${TABLE}`, cb)
  },
  get: id => (db, cb) => {
    db.get(`select * from ${TABLE} where id=?`, id, cb)
  },
  in: ids => (db, cb) => {
    return db.all(
      `select * from ${TABLE} where id in (${ids.map(() => '?').join(',')})`,
      ids,
      cb
    )
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
  },
  listByUser: (userId, offset, length) => (db, cb) => {
    return db.all(
      `select * from ${TABLE} \
      where user_id=? ` +
        (offset !== undefined ? `limit ${offset}, ${length}` : ''),
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
  }
})
