import { combineReducers } from 'redux'

const session = (state = null, action) => {
  switch (action.type) {
    case 'ACCOUNT.LOGIN_SUCCESS':
      return action.response.sessionId
    default:
      return state
  }
}

const isRequest = (state = false, action) => {
  switch (action.type) {
    case 'ACCOUNT.LOGIN_REQUEST':
      return true
    case 'ACCOUNT.LOGIN_SUCCESS':
    case 'ACCOUNT.LOGIN_FAILED':
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case 'ACCOUNT.LOGIN_REQUEST':
    case 'ACCOUNT.LOGIN_SUCCESS':
      return null
    case 'ACCOUNT.LOGIN_FAILED':
    case 'ACCOUNT.LOGIN_ERROR':
      return action.error
    default:
      return state
  }
}

const user = (state = null, action) => {
  switch (action.type) {
    case 'ACCOUNT.LOGIN_SUCCESS':
      return action.response.user
    default:
      return state
  }
}

export default combineReducers({
  session,
  isRequest,
  user,
  error
})

export const getIsRequest = state => state.isRequest
export const getError = state => state.error
export const getUser = state => state.user
export const getSession = state => state.session
