const { v1 } = require('node-uuid')
const SHA1 = require('sha1')

module.exports = (app, db) => {
  app.post('/account/register', async (req, res) => {
    const { username, password } = req.body
    const user = await db.user.getByUsername(username)
    if (user) {
      res.status(500).json({
        error: 'USER_EXISTS',
        msg: '该用户名已存在'
      })
    } else {
      const salt = v1()
      const serializedPassword = SHA1(password + salt)
      await db.user.create(username, serializedPassword, salt)

      res.json({ error: 0 })
    }
  })

  app.post('/account/login', async (req, res) => {
    const { username, password } = req.body

    const user = await db.user.getByUsername(username)
    if (!user) {
      return res.status(500).json({
        error: 'USER_NOT_EXIST',
        msg: '没有该用户'
      })
    } else {
      const serializedPassword = SHA1(password + user.salt)
      if (serializedPassword !== user.password) {
        return res.status(500).json({
          error: 'PASSWORD_WRONG',
          msg: '用户名密码不匹配'
        })
      } else {
        await db.session.deleteByUserId(user.id)

        const sessionId = v1()
        await db.session.create(sessionId, user.id)

        return res.json({
          sessionId
        })
      }
    }
  })

  app.get('/account/logout', (req, res) => {})
}
