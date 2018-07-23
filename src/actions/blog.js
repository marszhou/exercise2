import api from '../api'
import { triggerMessage } from './message'

export const create = ({ title, content }) => dispatch => {
  if (!(title || content)) {
    dispatch(triggerMessage('不能保存，有未填写完成的数据。'))
    return Promise.resolve()
  }
  dispatch({
    type: 'BLOG.FORM_REQUEST'
  })
  return api.blog.create({ title, content }).then(({ data }) => {
    const { blogId } = data
    dispatch({
      type: 'BLOG.FORM_SUCCESS',
      blogId
    })
    dispatch(triggerMessage('日志创建成功'))
  })
}

export const update = (id, { title, content }) => dispatch => {
  if (!(title || content)) {
    dispatch(triggerMessage('不能保存，有未填写完成的数据。'))
    return Promise.resolve()
  }
  dispatch({
    type: 'BLOG.FORM_REQUEST'
  })
  return api.blog.update(id, { title, content }).then(({ data }) => {
    const { blogId } = data
    dispatch({
      type: 'BLOG.FORM_SUCCESS',
      blogId
    })
    dispatch(triggerMessage('日志修改成功'))
  })
}

export const remove = id => (dispatch, getState) => {
  return api.blog.remove(id).then(() => {
    dispatch({
      type: 'BLOG.REMOVED',
      blogId: id
    })
  })
}

export const get = id => dispatch => {
  return api.blog.get(id).then(({ data }) => {
    dispatch({
      type: 'BLOG.GET',
      blog: data
    })
  })
}

export const list = (userId, offset) => dispatch => {
  const count = api.blog.count(userId)
  const list = api.blog.list(userId, offset)
  return Promise.all([count, list]).then(([{ count }, { list }]) => {
    dispatch({
      type: 'BLOG.LIST',
      count: count.rc,
      offset,
      list
    })
  })
}
