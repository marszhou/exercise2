import axios from 'axios'

const baseURL = '/account'
export const register = (username, password, password2, gender) =>
  axios.post(baseURL + '/register', {username, password, password2, gender})

export const login = (username, password) =>
  axios.post(baseURL + '/login', {username, password})