import axios from 'axios'
import * as account from './account'
import * as blog from './blog'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

export default {
  account, blog
}

export const setAxiosGlobalConfig = (axios, cb) => cb(axios)

export const setLoginInfoForAxios = (session) => {
  setAxiosGlobalConfig(axios, (axios) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+session
  })
}

export const unsetLoginInfoForAxios = () => {
  setAxiosGlobalConfig(axios, (axios) => {
    delete axios.defaults.headers.common['Authorization']
  })
}