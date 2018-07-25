module.exports = TABLE => ({
  get: id => (db, cb) => {
    db.get(`select * from ${TABLE} where id=?`, id, cb)
  },
  in: ids => (db, cb) => {
    return db.all(
      `select * from ${TABLE} where id in (${ids.map(() => '?').join(',')})`,
      ids,
      cb
    )
  }
})
