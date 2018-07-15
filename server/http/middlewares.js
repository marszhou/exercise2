const whenLogined = (callback) => (req, res, next) => {
  const logined = false
  if (logined) {
    next()
  } else {
    callback(req, res)
  }
}

module.exports = {
  whenLogined
}