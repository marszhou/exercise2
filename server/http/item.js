const _ = require('lodash')

module.exports = (app, db) => {
  app.get('/items/:itemId', async (req, res) => {
    const item = await db.item.get(req.params.itemId)
    if (item) {
      let categories = await db.item.getCategories(req.params.itemId)
      categories = await db.category.in(categories.map(c => c.category_id))
      item.categories = categories
      res.json(item)
    } else {
      res.status(500).json({
        code: 'ITEM_NOT_FOUND',
        msg: '没有该商品'
      })
    }
  })

  app.get('/items', async (req, res) => {
    const conditions = {}
    const query = req.query
    if ('category' in query) conditions['category_id'] = query.category
    if ('brand' in query) conditions['brand_id'] = query.brand
    const items = await db.item.list(conditions)

    // @see https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
    await Promise.all(
      items.map(async item => {
        item.brand = await db.brand.get(item.brand_id)
        let categories = await db.item.getCategories(item.id)
        categories = await db.category.in(categories.map(c => c.category_id))
        item.categories = categories
      })
    )
    res.json(items.map(item => _.omit(item, 'brand_id')))
  })
}
