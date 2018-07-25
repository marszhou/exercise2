const TABLE = 'brands'

module.exports = {
  all: () => (db, cb) => {
    return db.all(`select * from ${TABLE}`, cb)
  },
  get: id => (db, cb) => {
    return db.get(
      `select * from ${TABLE} where ${TABLE}.id=?`,
      id,
      cb
    )
  }
}
