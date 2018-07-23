const { requireLogin } = require('./middlewares')

module.exports = (app, db) => {
  const validBlogRequest = async (req, res, next) => {
    const blogId = req.params.blogId
    const userId = req.login.id
    const blog = await db.blog.get(blogId)
    if (!blog) {
      return res
        .status(500)
        .json({ code: 'BLOG_NOT_EXISTS', msg: 'blog不存在' })
    }
    if (blog.user_id !== userId) {
      return res.status(500).json({ code: 'HAS_NO_RIGHTS', msg: '权限错误' })
    }

    next()
  }

  app.get('/blogs/:blogId', async (req, res) => {
    const blog = await db.blog.get(req.params.blogId)
    res.json(blog)
  })

  app.post('/blogs', requireLogin(db), async (req, res) => {
    const { title, content } = req.body
    const userId = req.login.id
    const ret = await db.blog.create(userId, title, content)
    const blog = await db.blog.get(ret.lastID)
    res.json(blog)
  })

  app.get('/blogs/user/:userId', async (req, res) => {
    const userId = req.params.userId
    const offset = req.query.offset || 0
    const ret = await db.blog.list(userId, offset, 10)
    res.json(ret)
  })

  app.get('/blogs/user/:userId/count', async (req, res) => {
    const userId = req.params.userId
    const ret = await db.blog.count(userId)
    res.json(ret)
  })

  app.put(
    '/blogs/:blogId',
    requireLogin(db),
    validBlogRequest,
    async (req, res) => {
      const blogId = req.params.blogId
      const { title, content } = req.body
      const ret = await db.blog.update(blogId, { title, content })
      const blog = await db.blog.get(blogId)
      res.json(blog)
    }
  )

  app.delete(
    '/blogs/:blogId',
    requireLogin(db),
    validBlogRequest,
    async (req, res) => {
      const blogId = req.params.blogId
      const blog = await db.blog.get(blogId)
      if (!blog) {
        res.status(500).json({
          code: 'BLOG_NOT_EXISTS',
          msg: 'blog不存在'
        })
      } else {
        await db.blog.delete(blogId)
        res.json(blog)
      }
    }
  )
}
