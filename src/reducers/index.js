import _ from 'lodash'
import login, * as fromLogin from './login'
import { combineReducers } from 'redux'

const root = combineReducers({
  login
})

export default root

export const loginSelectors = _.keys(fromLogin).reduce(
  (ret, name) => ({
    ...ret,
    [name]: state => fromLogin[name](state.login)
  }),
  {}
)
