module.exports = (app, db) => {
  app.get('/brands', async (req, res) => {
    const brands = await db.brand.all()
    res.json(brands)
  })

  app.get('/brands/:brandId', async (req, res) => {
    const brand = await db.brand.get(req.params.brandId)
    res.json(brand)
  })
}
