const joinCondition = require('./joinConditions')
const _ = require('lodash')

const TABLE = 'items'

module.exports = {
  list: conditions => (db, cb) => {
    let sql = ''
    if ('category_id' in conditions) {
      sql = `select ${TABLE}.* from ${TABLE} left join category_item_set as ci on ${TABLE}.id = ci.item_id`
    } else {
      sql = `select * from ${TABLE} `
    }
    const bind = joinCondition(conditions)
    sql = sql + ` where ${bind[0]}`
    return db
      .prepare(sql)
      .all(bind[1], cb)
      .finalize()
  },
  get: id => (db, cb) => {
    return db.get(
      `select ${TABLE}.*, stacks.number from ${TABLE} \
      left join stacks on ${TABLE}.id=stacks.item_id \
      where ${TABLE}.id=?`,
      id,
      cb
    )
  },
  getCategories: id => (db, cb) => {
    return db.all(
      `select category_id from category_item_set where item_id=?`,
      id,
      cb
      // function(error, categories) {
      //   if (error) {
      //     cb(error)
      //   } else {
      //     if (categories.length > 0) {
      //       require('./category').gets(categories.map(c => c.category_id))(
      //         db,
      //         cb
      //       )
      //     } else {
      //       cb(null, [])
      //     }
      //   }
      // }
    )
  }
}
