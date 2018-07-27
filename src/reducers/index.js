import _ from 'lodash'
import login, * as fromLogin from './login'
import register, * as fromRegister from './register'
import message from './message'
import blogs, * as fromBlogs from './blogs'
import users, * as fromUsers from './users'

import { combineReducers } from 'redux'

const root = combineReducers({
  login,
  register,
  message,
  blogs,
  users
})

export default root

const makeGroupSelectors = (namespace, statePath) =>
  _.keys(namespace).reduce(
    (ret, name) => ({
      ...ret,
      [name]: state => namespace[name](_.get(state, statePath))
    }),
    {}
  )

export const loginSelectors = makeGroupSelectors(fromLogin, 'login')
export const registerSelectors = makeGroupSelectors(fromRegister, 'register')
export const getMessage = state => state.message
export const blogsSelectors = makeGroupSelectors(fromBlogs, 'blogs')
export const usersSelectors = makeGroupSelectors(fromUsers, 'users')
