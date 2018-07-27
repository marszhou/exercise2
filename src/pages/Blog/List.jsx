import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import * as queryString from 'query-string'
import { blogsSelectors, usersSelectors } from '../../reducers'
import BlogItemList from '../../components/BlogItemList'
import Pagination from '../../components/Pagination'

class BlogList extends Component {
  componentWillMount() {
    const page = this.getCurrentPage(this.props)
    this.props.list((page - 1) * 10)
  }

  componentWillReceiveProps(nextProps) {
    const oldPage = this.getCurrentPage(this.props)
    const page = this.getCurrentPage(nextProps)
    if (oldPage !== page) {
      this.props.list((page - 1) * 10)
    }
  }

  getCurrentPage(props) {
    const query = queryString.parse(props.location.search)
    const { page = 1 } = query
    return +page
  }

  render() {
    const { blogs, pagination, isRequest } = this.props

    console.log(pagination)
    return (
      <div>
        {isRequest && blogs.length === 0
          ? 'loading'
          : [
              <BlogItemList key="list" items={blogs} />,
              <Pagination key="pagination" {...pagination} />
            ]}
      </div>
    )
  }
}

BlogList = connect(
  (state, ownProps) => {
    const query = queryString.parse(ownProps.location.search)
    const { page = 1 } = query
    return {
      blogs: blogsSelectors
        .getPage(state, +page)
        .map(blog => ({
          ...blog,
          user: usersSelectors.getUser(state, blog.user)
        })),
      pagination: blogsSelectors.getPagination(state, +page),
      isRequest: blogsSelectors.getIsListRequest(state),
    }
  },
  actions.blog
)(BlogList)

export default BlogList
