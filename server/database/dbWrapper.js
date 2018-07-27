const _ = require('lodash')

const dbWrapper = db => methods => {
  return _.keys(methods).reduce((ret, methodName) => {
    ret[methodName] = (...args) =>
      new Promise((resolve, reject) => {
        // const db = getDb()
        methods[methodName](...args)(db, function(error, result) {
          if (error) {
            reject(error)
          } else {
            if (this.lastID || this.changes) {
              resolve(_.pick({...this}, 'lastID', 'changes'))
            } else {
              resolve(result)
            }
          }
        })
        // db.close()
      })
    return ret
  }, {})
}

module.exports = dbWrapper
