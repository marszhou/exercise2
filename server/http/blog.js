const { requireLogin } = require('./middlewares')
const _ = require('lodash')

const formatUser = user => _.omit(user, 'password', 'salt')
const outputBlog = async (db, res, blogId) => {
  const blog = await db.blog.get(blogId)
  const user = await db.user.get(blog.user_id)
  res.json({ blog: { ..._.omit(blog, 'user_id'), user: formatUser(user) } })
}
const outputBlogs = async (db, res, offset, queryFunc) => {
  const blogs = await queryFunc(offset, 10)
  const users = await db.user.in(_.uniq(blogs.map(b => b.user_id)))
  res.json({
    blogs: blogs.map(blog => {
      const user = users.find(user => blog.user_id === user.id)
      return { ..._.omit(blog, 'user_id'), user: formatUser(user) }
    })
  })
}

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

  app.get('/blogs/:blogId(\\d+)', async (req, res) => {
    outputBlog(db, res, req.params.blogId)
  })

  app.post('/blogs', requireLogin(db), async (req, res) => {
    const { title, content } = req.body
    const userId = req.login.id
    const ret = await db.blog.create(userId, title, content)
    outputBlog(db, res, ret.lastID)
  })

  app.get('/blogs/user/:userId(\\d+)', async (req, res) => {
    const userId = req.params.userId
    const offset = req.query.offset || 0
    outputBlogs(db, res, offset, _.partial(db.blog.listByUser, userId))
  })

  app.get('/blogs/user/:userId(\\d+)/count', async (req, res) => {
    const userId = req.params.userId
    const ret = await db.blog.countByUser(userId)
    res.json(ret)
  })

  app.get('/blogs', async (req, res) => {
    const offset = req.query.offset || 0
    outputBlogs(db, res, offset, db.blog.list)
  })

  app.get('/blogs/count', async (req, res) => {
    const ret = await db.blog.count()
    res.json(ret)
  })

  app.put(
    '/blogs/:blogId(\\d+)',
    requireLogin(db),
    validBlogRequest,
    async (req, res) => {
      const blogId = req.params.blogId
      const { title, content } = req.body
      const ret = await db.blog.update(blogId, { title, content })
      outputBlog(db, res, blogId)
    }
  )

  app.delete(
    '/blogs/:blogId(\\d+)',
    requireLogin(db),
    validBlogRequest,
    async (req, res) => {
      const blogId = req.params.blogId
      outputBlog(db, res, blogId)
      await db.blog.delete(blogId)
    }
  )
}
