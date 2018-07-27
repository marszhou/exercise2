import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import * as queryString from 'query-string'
import { blogsSelectors, usersSelectors } from '../../reducers'
import BlogItemList from '../../components/BlogItemList'
import Pagination from '../../components/Pagination'
import Loading from '../../components/Loading'

class BlogListByAuthor extends Component {
  componentWillMount() {
    const page = this.getCurrentPage(this.props)
    this.props.listByUser(this.props.match.params.userId, (page - 1) * 10)
  }

  componentWillReceiveProps(nextProps) {
    const oldPage = this.getCurrentPage(this.props)
    const page = this.getCurrentPage(nextProps)
    if (oldPage !== page) {
      this.props.listByUser(nextProps.match.params.userId, (page - 1) * 10)
    }
  }

  getCurrentPage(props) {
    const query = queryString.parse(props.location.search)
    const { page = 1 } = query
    return +page
  }

  render() {
    const { blogs, pagination, isRequest, user } = this.props

    return (
      <div>
        {user ? (
          <h1 style={{ textAlign: 'center' }} key="title">
            {user.username}的日志列表
          </h1>
        ) : null}
        {isRequest && blogs.length === 0 ? (
          <Loading />
        ) : (
          [
            <BlogItemList key="list" items={blogs} />,
            <Pagination key="pagination" {...pagination} />
          ]
        )}
      </div>
    )
  }
}

BlogListByAuthor = connect(
  (state, ownProps) => {
    const userId = ownProps.match.params.userId
    const query = queryString.parse(ownProps.location.search)
    const { page = 1 } = query
    return {
      blogs: blogsSelectors.getPageByUser(state, userId, +page).map(blog => ({
        ...blog,
        user: usersSelectors.getUser(state, blog.user)
      })),
      pagination: blogsSelectors.getPaginationByUser(state, userId, +page),
      isRequest: blogsSelectors.getIsListRequest(state),
      user: usersSelectors.getUser(state, userId)
    }
  },
  actions.blog
)(BlogListByAuthor)

export default BlogListByAuthor
