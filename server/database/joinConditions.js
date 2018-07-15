const _ = require('lodash')

module.exports = (conditions) => {
  const keys = _.keys(conditions)
  const wheres = ['1=1']
  const params = []

  keys.forEach(key=> {
    const value = conditions[key]
    if (typeof value === 'object') {
      wheres.push(`${key} ${value.op} ?`)
      params.push(value.value)
    } else {
      wheres.push(`${key} = ?`)
      params.push(value)
    }
  })

  return [wheres.join(' AND '), params]
}