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
    dispatch({
      type: 'BLOG.CREATE_SUCCESS',
      blog: data
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
    type: 'BLOG.UPDATE_REQUEST'
  })
  return api.blog.update(id, { title, content }).then(({ data }) => {
    dispatch({
      type: 'BLOG.FORM_SUCCESS',
      blog: data
    })
    dispatch(triggerMessage('日志修改成功'))
  })
}

export const remove = id => (dispatch) => {
  return api.blog.remove(id).then(({data}) => {
    dispatch({
      type: 'BLOG.REMOVED',
      blog: data
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

export const listByUser = (userId, offset) => dispatch => {
  const count = api.blog.countByUser(userId)
  const list = api.blog.listByUser(userId, offset)
  return Promise.all([count, list]).then(([{ count }, { list }]) => {
    dispatch({
      type: 'BLOG.LIST_BY_USER',
      userId,
      count: count.rc,
      offset,
      list
    })
  })
}

export const list = offset => dispatch => {
  const count = api.blog.count()
  const list = api.blog.list(offset)
  return Promise.all([count, list]).then(
    ([{ data: count }, { data: list }]) => {
      dispatch({
        type: 'BLOG.LIST',
        count: count.rc,
        offset,
        list
      })
    }
  )
}
