module.exports = (app, db) => {
  // app.use('/items', function(req, res, next) {
  //   throw new Error('Boom!')
  // })
  // app.use('/items', function(err, req, res, next) {
  //   console.error(err.stack);
  //   res.status(500).send('Something broke!');
  // })

  app.get('/brands', async (req, res) => {
    const brands = await db.brand.all()
    res.json(brands)
  })

  app.get('/brands/:brandId', async (req, res) => {
    const brand = await db.brand.get(req.params.brandId)
    res.json(brand)
  })

}
