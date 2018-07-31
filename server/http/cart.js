const { requireLogin } = require('./middlewares')
const _ = require('lodash')

module.exports = (app, db) => {
  const validCartItemRequest = async (req, res, next) => {
    const id = req.params.cartItemId
    const userId = req.login.id
    const cartItem = await db.cartItem.get(id)
    if (!cartItem) {
      return res
        .status(500)
        .json({ code: 'CARTITEM_NOT_EXISTS', msg: '购物车物品不存在' })
    }
    if (cartItem.user_id !== userId) {
      return res.status(500).json({ code: 'HAS_NO_RIGHTS', msg: '权限错误' })
    }
    request.cartItem = cartItem
    next()
  }

  app.get('/cart', requireLogin(db), async (req, res) => {
    let cartItems = await db.cartItem.listByUser(req.login.id)
    const items = await db.item.in(cartItems.map(ci => ci.item_id))
    cartItems = cartItems.map(cartItem => ({
      ..._.omit(cartItem, 'item_id'),
      item: items.find(item => item.id === cartItem.item_id)
    }))
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
    const cartItem = await db.cartItem.get(citemId)
    const item = await db.item.get(itemId)

    res.json({..._.omit(cartItem, 'item_id'), item})
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
    const cartItem = await db.cartItem.get(citemId)
    const item = await db.item.get(itemId)

    res.json({..._.omit(cartItem, 'item_id'), item})
  })

  app.delete(
    '/cart/:cartItemId',
    requireLogin(db),
    validCartItemRequest,
    async (req, res) => {
      const id = req.params.cartItemId
      await db.cartItem.delete(id)
      res.json(req.cartItem)
    }
  )

  app.post('/cart/clear', requireLogin(db), async (req, res) => {
    res.json(await db.cartItem.clear(req.login.id))
  })
}
