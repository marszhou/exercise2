import _ from 'lodash'
import login, * as fromLogin from './login'
import register, * as fromRegister from './register'
import { combineReducers } from 'redux'

const root = combineReducers({
  login, register
})

export default root

export const loginSelectors = _.keys(fromLogin).reduce(
  (ret, name) => ({
    ...ret,
    [name]: state => fromLogin[name](state.login)
  }),
  {}
)

export const registerSelectors = _.keys(fromRegister).reduce(
  (ret, name) => ({
    ...ret,
    [name]: state => fromRegister[name](state.register)
  }),
  {}
)