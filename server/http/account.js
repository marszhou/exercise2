const { v1 } = require('node-uuid')
const SHA1 = require('sha1')
const sleep = require('../utils/sleep')
const _ = require('lodash')

const fieldMapping = {
  username: '用户名',
  password: '密码',
  password2: '重复密码',
  gender: '性别'
}

const validateRegister = data => {
  const emptyField = _.keys(data).find(key => {
    const value = data[key]
    if (typeof value === 'string') {
      return value.trim().length === 0
    }
    return !value
  })
  if (emptyField) {
    return {
      field: emptyField,
      msg: `${fieldMapping[emptyField]} 必填`
    }
  }

  if (!/^[a-z0-9]{4,20}$/i.test(data.username)) {
    return {
      field: 'username',
      msg: '用户名应使用英文和数字，4-20个字符'
    }
  }

  if (data.password.length <6) {
    return {
      field: 'password',
      msg: '密码长度不得小于6位'
    }
  }
  console.log(data.password !== data.password2, data.password, data.password2)
  if (data.password !== data.password2) {
    return {
      field: 'password2',
      msg: '重复输入密码和第一次不一致'
    }
  }

  return true
}

module.exports = (app, db) => {
  app.post('/account/register', async (req, res) => {
    // await sleep(1000)
    const {username, password, password2, gender} = req.body
    const valid = validateRegister({username, password, password2, gender})
    if (valid !== true) {
      return res.status(500).json({
        code: 'FORM_IMCOMPLETE',
        ...valid
      })
    }

    const user = await db.user.getByUsername(username)
    if (user) {
      res.status(500).json({
        code: 'USER_EXISTS',
        msg: '该用户名已存在'
      })
    } else {
      const salt = v1()
      const serializedPassword = SHA1(password + salt)
      const ret = await db.user.create(username, serializedPassword, salt, gender)

      res.json({ userId: ret.lastID})
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
