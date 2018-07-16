import { combineReducers } from 'redux'

const isRequest = (state = false, action) => {
  switch (action.type) {
    case 'ACCOUNT.REGISTER_REQUEST':
      return true
    case 'ACCOUNT.REGISTER_SUCCESS':
    case 'ACCOUNT.REGISTER_FAILED':
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case 'ACCOUNT.REGISTER_REQUEST':
    case 'ACCOUNT.REGISTER_SUCCESS':
      return null
    case 'ACCOUNT.REGISTER_FAILED':
      return action.error
    default:
      return state
  }
}

export default combineReducers({
  isRequest,
  error
})

export const getIsRequest = state => state.isRequest
export const getError = state => state.error
