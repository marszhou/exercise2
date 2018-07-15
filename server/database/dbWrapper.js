const _ = require('lodash')

const dbWrapper = getDb => methods => {
  return _.keys(methods).reduce((ret, methodName) => {
    ret[methodName] = (...args) =>
      new Promise((resolve, reject) => {
        const db = getDb()
        methods[methodName](...args)(db, (error, result) => {
          // console.log({error, result})
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
        db.close()
      })
    return ret
  }, {})
}

module.exports = dbWrapper
