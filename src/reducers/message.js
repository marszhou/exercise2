import { combineReducers } from 'redux'

const text = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return action.text
    case 'HIDE_MESSAGE':
      return null
    default:
      return state
  }
}

const isHiding = (state = true, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return false
    case 'HIDE_MESSAGE':
      return true
    default:
      return state
  }
}
const message = combineReducers({
  text,
  isHiding
})
export default message
