const { v1 } = require('node-uuid')
const SHA1 = require('sha1')
const sleep = require('../utils/sleep')
const _ = require('lodash')

module.exports = (app, db) => {
  app.post('/account/register', async (req, res) => {
    const { username, password } = req.body
    const user = await db.user.getByUsername(username)
    if (user) {
      res.status(500).json({
        code: 'USER_EXISTS',
        msg: '该用户名已存在'
      })
    } else {
      const salt = v1()
      const serializedPassword = SHA1(password + salt)
      await db.user.create(username, serializedPassword, salt)

      res.json({ code: 0 })
    }
  })

  app.post('/account/login', async (req, res) => {
    const { username, password } = req.body
    // await sleep(5000)
    const user = await db.user.getByUsername(username)
    if (!user) {
      return res.status(500).json({
        code: 'USER_NOT_EXIST',
        msg: '没有该用户'
      })
    } else {
      const serializedPassword = SHA1(password + user.salt)
      if (serializedPassword !== user.password) {
        return res.status(500).json({
          code: 'PASSWORD_WRONG',
          msg: '用户名密码不匹配'
        })
      } else {
        await db.session.deleteByUserId(user.id)

        const sessionId = v1()
        await db.session.create(sessionId, user.id)

        return res.json({
          sessionId,
          user: _.omit(user, 'password', 'salt')
        })
      }
    }
  })

  app.get('/account/logout', (req, res) => {})
}
