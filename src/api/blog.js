import axios from 'axios'

const baseURL = '/blogs'

export const get = id => axios.get(baseURL + '/' + id)

export const create = ({ title, content }) =>
  axios.post(baseURL, { title, content })

export const update = (id, { title, content }) =>
  axios.put(baseURL + '/' + id, { title, content })

export const remove = id => axios.delete(baseURL + '/' + id)

export const listByUser = (userId, offset = 0) =>
  axios.get(baseURL + `/user/${userId}`, { params: { offset } })

export const countByUser = userId => axios.get(baseURL + `/user/${userId}/count`)
