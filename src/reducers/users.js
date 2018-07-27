import _ from 'lodash'
// import { combineReducers } from 'redux';

const users = (state = {}, action) => {
  const users = _.get(action, 'response.entities.users')
  if (users) {
    return {...state, ...users}
  }
  return state
}
export default users

export const getUser = (state, userId) => state[userId]