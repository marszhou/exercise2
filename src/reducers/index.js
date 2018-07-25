import _ from 'lodash'
import login, * as fromLogin from './login'
import register, * as fromRegister from './register'
import message from './message'
import blog, * as fromBlog from './blog'
import { combineReducers } from 'redux'

const root = combineReducers({
  login, register, message, blog
})

export default root

const groupSelector = (namespace, statePath) => _.keys(namespace).reduce(
  (ret, name) => ({
    ...ret,
    [name]: state => namespace[name](_.get(state, statePath))
  }),
  {}
)

export const loginSelectors = groupSelector(fromLogin, 'login')
export const registerSelectors = groupSelector(fromRegister, 'register')
export const getMessage = state => state.message
export const blogSelectors = groupSelector(fromBlog, 'blog')
