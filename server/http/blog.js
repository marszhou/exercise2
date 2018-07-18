module.exports = (app, db) => {
  app.get('/blogs/:blogId', async (req, res) => {
    const blog = await db.blog.get(req.params.blogId)
    res.json(blog)
  })

  app.post('/blogs', async (req, res) => {
    const {title, content} = req.body
    const userId = 1
    const ret = await db.blog.create(userId, title, content)
    res.json({
      blogId: ret.lastID
    })
  })

  app.get('/blogs/user/:userId', async (req, res) => {
    const userId = req.params.userId
    const offset = req.query.offset || 0
    const ret = await db.blog.list(userId, offset, 10)
    res.json(ret)
  })

  app.put('/blogs/:blogId', async (req, res) => {
    const blogId = req.params.blogId
    const userId = 1
    const {title, content} = req.body

    const ret = await db.blog.update(blogId, {title, content})
    res.json(ret)
  })
}
