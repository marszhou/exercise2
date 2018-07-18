import axios from 'axios'

const baseURL = '/blogs'

export const get = id => axios.get(baseURL + '/' + id)
