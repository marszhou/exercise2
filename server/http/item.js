module.exports = (app, db) => {
  // app.use('/items', function(req, res, next) {
  //   throw new Error('Boom!')
  // })
  // app.use('/items', function(err, req, res, next) {
  //   console.error(err.stack);
  //   res.status(500).send('Something broke!');
  // })

  app.get('/items/:itemId', async (req, res) => {
    const item = await db.item.get(req.params.itemId)
    res.json(item)
  })

  app.get('/items', async (req, res) => {
    const conditions = {}
    const query = req.query
    if ('category' in query) conditions['category_id'] = query.category
    if ('brand' in query) conditions['brand_id'] = query.brand
    res.json(await db.item.list(conditions))
  })
}
