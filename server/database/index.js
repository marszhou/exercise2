const getDatabase = require('./getDatabase')
const dbWrapper = require('./dbWrapper')(getDatabase)

module.exports = {
  user: dbWrapper(require('./user')),
  session: dbWrapper(require('./session')),
  item: dbWrapper(require('./item')),
  blog: dbWrapper(require('./blog')),
  brand: dbWrapper(require('./brand')),
  category: dbWrapper(require('./category'))
}