const _ = require('lodash')
const updateBind = require('./updateBind')

const TABLE = 'blogs'

const dbWrapper = (getMethods, db) => {
  _.keys(getMethods(db)).reduce((ret, methodName) => {
    ret[methodName] = (...args) =>
      new Promise((resolve, reject) => {
        methods[methodName](...args, (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
      })
  }, {})
}

module.exports = db => ({
  get(id) {
    db.get(`select * from ${TABLE} where id=?`, id, function(error, result) {})
  }
})

// module.exports = db => ({
//   get(id) {
//     return db.prepare(`select * from ${TABLE} where id=?`).get(id)
//   },
//   create(userId, title, content) {
//     return db
//       .prepare(
//         `insert into ${TABLE} (user_id, title, content, create_time) values(?, ?, ?, ?)`
//       )
//       .run(userId, title, content, Date.now())
//   },
//   update(id, props) {
//     const bind = updateBind(props)
//     return db
//       .prepare(`update ${TABLE} set ${bind[0]} where id=?`)
//       .run([...bind[1], id])
//   },
//   delete(id) {
//     return db.prepare(`delete from ${TABLE} where id=?`).run(id)
//   },
//   list(userId, start, length) {
//     return db
//       .prepare(
//         `select * from ${TABLE} where user_id = ? limit ${start}, ${length}`
//       )
//       .all(userId)
//   },
//   count(userId) {
//     const {rc} = db
//       .prepare(`select count(*) as rc from ${TABLE} where user_id=?`)
//       .get(userId)
//     return rc
//   }
// })
