const TABLE = 'categories'

module.exports = {
  all: () => (db, cb) => {
    return db.all(`select * from ${TABLE}`, cb)
  },
  get: id => (db, cb) => {
    return db.get(`select * from ${TABLE} where ${TABLE}.id=?`, id, cb)
  },
  gets: ids => (db, cb) => {
    return db.all(`select * from ${TABLE} where id in (${ids.map(() => '?').join(',')})`, ids, cb)
  }
}
