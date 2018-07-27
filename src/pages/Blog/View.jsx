import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { blogsSelectors, usersSelectors } from '../../reducers'
import * as queryString from 'query-string'
import Loading from '../../components/Loading'
import moment from 'moment'
import styles from '../../styles.module.css'

class BlogView extends Component {
  componentWillMount() {
    const id = this.props.match.params.blogId
    this.props.get(id)
  }
  render() {
    const { blog, history } = this.props
    return (
      <div>
        {blog ? (
          <div className={styles.blogView}>
            <h1>{blog.title}</h1>
            <p>
              作者: {blog.user.username} 创建时间:{' '}
              {moment(blog.create_time).format('YYYY-MM-DD HH:mm')}
            </p>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        ) : (
          <Loading />
        )}

        <p style={{ textAlign: 'center' }}>
          {history.length > 0 ? (
            <button type="button" onClick={() => history.goBack()}>
              返回
            </button>
          ) : null}
        </p>
      </div>
    )
  }
}

BlogView = connect(
  (state, ownProps) => {
    const id = ownProps.match.params.blogId
    let blog = blogsSelectors.getBlog(state, id)
    if (blog) {
      blog = { ...blog, user: usersSelectors.getUser(state, blog.user) }
    }
    return {
      blog
    }
  },
  actions.blog
)(BlogView)

export default BlogView
