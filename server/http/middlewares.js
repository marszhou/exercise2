const requireLogin = db => async (req, res, next) => {
  const auth = req.headers.authorization || ''
  const token = auth.substr(auth.indexOf('Bearer') + 7)
  let accessGranted = true

  if (token) {
    const session = await db.session.get(token)
    if (session) {
      const user = await db.user.get(session.user_id)
      if (user) {
        req.login = user
      } else {
        accessGranted = false
      }
    } else {
      accessGranted = false
    }
  } else {
    accessGranted = false
  }

  if (!accessGranted) {
    res.status(403).json({
      code: 'DENY_ACCESS',
      msg: '无权访问'
    })
  }

  next()
}

module.exports = {
  requireLogin
}
