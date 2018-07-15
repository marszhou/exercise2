import axios from 'axios'

const baseURL = '/account'
export const register = (username, password) =>
  axios.post(baseURL + '/register', {username, password})

export const login = (username, password) =>
  axios.post(baseURL + '/login', {username, password})