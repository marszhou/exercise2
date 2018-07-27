import { combineReducers } from 'redux'
import _ from 'lodash'
import { calcuatePagination } from '../utils/pagination'

const isFormRequest = (state = false, action) => {
  switch (action.type) {
    case 'BLOG.FORM_REQUEST':
      return true
    case 'BLOG.CREATE_SUCCESS':
    case 'BLOG.UPDATE_SUCCESS':
      return false
    default:
      return state
  }
}

const count = listActionName => (state = 0, action) => {
  switch (action.type) {
    case listActionName:
      return action.count
    case 'BLOG.CREATE_SUCCESS':
      return state + 1
    case 'BLOG.REMOVED':
      const count = state - 1
      return count >= 0 ? count : 0
    default:
      return state
  }
}

const countByUser = (state = {}, action) => {
  const {userId} = action

  if (userId) {
    return {
      ...state,
      [userId]: count('BLOG.LIST_BY_USER')(state[userId], action)
    }
  }

  return state
}

const offset = listActionName => (state = {}, action) => {
  const { offset } = action

  switch (action.type) {
    case listActionName:
      return action.response.result.blogs.reduce(
        (ret, blogId, index) => {
          ret[offset + index] = blogId
          return ret
        },
        { ...state }
      )

    case 'BLOG.REMOVED':
      return Object.keys(state).reduce((ret, offset) => {
        if (ret[offset] !== action.response.result.blog.id) {
          return { [offset]: state[offset] }
        }
        return ret
      }, {})

    default:
      return state
  }
}

const offsetByUser = (state = {}, action) => {
  const {userId} = action
  if (userId) {
    const nextState = {
      ...state,
      [userId]: offset('BLOG.LIST_BY_USER')(state[userId], action)
    }
    return nextState
  }
  return state
}

const byId = (state = {}, action) => {
  const { blogs } = _.get(action, 'response.entities', {})

  if (blogs) {
    const nextState = {
      ...state,
      ...blogs
    }
    return nextState
  }
  return state
}

export default combineReducers({
  isFormRequest,
  countByUser,
  offsetByUser,
  byId,
  count: count('BLOG.LIST'),
  offset: offset('BLOG.LIST')
})

const pageSize = 10
export const getPageByUser = (state, userId, page) => {
  const offset = state.offsetByUser[userId]
  const start = (page - 1) * pageSize
  return [...Array(pageSize)]
    .reduce(
      ((ret, v, index) => {
        const pos = start + index
        ret.push(offset[pos])
        return ret
      },
      [])
    )
    .map(blogId => (blogId ? state.byId[blogId] : null))
}
export const getPage = (state, page) => {
  const offset = state.offset
  const start = (page - 1) * pageSize
  return [...Array(pageSize)]
    .reduce(
      ((ret, v, index) => {
        const pos = start + index
        ret.push(offset[pos])
        return ret
      },
      [])
    )
    .map(blogId => (blogId ? state.byId[blogId] : null))
}

export const getPaginationByUser = (state, userId, currentPage) => {
  const count = state.countByUser[userId] || 0
  return calcuatePagination(currentPage, pageSize, count)
}
export const getPagination = (state, userId, currentPage) => {
  const count = state.count
  return calcuatePagination(currentPage, pageSize, count)
}

export const getIsFormRequest = state => state.isFormRequest
