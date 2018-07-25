const { requireLogin } = require('./middlewares')

module.exports = (app, db) => {
  app.get('/cart', requireLogin(db), async (req, res) => {
    const cartItems = await db.cartItem.listByUser(req.login.id)
    res.json(cartItems)
  })

  app.post('/cart/add', requireLogin(db), async (req, res) => {
    const { itemId, number } = req.body
    const userId = req.login.id
    const citem = await db.cartItem.getItemByUser(userId, itemId)
    let citemId = null
    if (citem) {
      await db.cartItem.update(citem.id, citem.number + number)
      citemId = citem.id
    } else {
      const result = await db.cartItem.create(userId, itemId, number)
      citemId = result.lastID
    }
    res.json(await db.cartItem.get(citemId))
  })

  app.post('/cart/set', requireLogin(db), async (req, res) => {
    const { itemId, number } = req.body
    const userId = req.login.id
    const citem = await db.cartItem.getItemByUser(userId, itemId)
    let citemId = null
    if (citem) {
      await db.cartItem.update(citem.id, number)
      citemId = citem.id
    } else {
      const result = await db.cartItem.create(userId, itemId, number)
      citemId = result.lastID
    }
    res.json(await db.cartItem.get(citemId))
  })

  app.delete('/cart', requireLogin(db), async (req, res) => {
    res.json(await db.cartItem.clear(req.login.id))
  })
}
