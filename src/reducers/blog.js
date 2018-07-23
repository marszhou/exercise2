import { combineReducers } from 'redux'

const isFormRequest = (state = false, action) => {
  switch (action.type) {
    case 'BLOG.FORM_REQUEST':
      return true
    case 'BLOG.CREATE_SUCCESS':
    case 'BLOG.UPDATE_REQUEST':
      return false
    default:
      return state
  }
}

const countByUser = (state = {}, action) => {
  if (action.type === 'BLOG.LIST') {
    const nextState = {
      ...state,
      [action.userId]: action.count
    }
    return nextState
  }
  return state
}

const offset = (state = {}, action) => {
  if (action.type === 'BLOG.LIST') {
    const { offset, list } = action
    const nextState = {
      ...state,
      ...list.reduce((ret, blog, index) => {
        ret[offset + index] = blog.id
        return ret
      }, {})
    }
    return nextState
  }
  return state
}

const offsetByUser = (state = {}, action) => {
  if (action.userId) {
    const nextState = {
      ...state,
      [action.userId]: offset(state[action.userId], action)
    }
    return nextState
  }
  return state
}

const byId = (state = {}, action) => {
  if (action.type === 'BLOG.LIST') {
    const nextState = {
      ...state,
      ...action.list.reduce((ret, blog) => {
        ret[blog.id] = blog
        return ret
      }, {})
    }
    return nextState
  }
  return state
}

export default combineReducers({
  isFormRequest, countByUser, offsetByUser, byId
})