import axios from 'axios'
import * as account from './account'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

export default {
  account
}