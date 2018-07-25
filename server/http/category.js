module.exports = (app, db) => {
  app.get('/categories', async (req, res) => {
    const categories = await db.category.all()
    res.json(categories)
  })

  app.get('/categories/:categoryId', async (req, res) => {
    const category = await db.category.get(req.params.categoryId)
    res.json(category)
  })

}
