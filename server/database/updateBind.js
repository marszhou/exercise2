const _ = require('lodash')

module.exports = (props) => {
  const params = []
  const values = []

  _.keys(props).forEach(key => {
    params.push(`${key} = ?`)
    values.push(props[key])
  })

  return [params.join(','), values]
}