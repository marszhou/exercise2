import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { blogsSelectors } from '../../reducers'
import Loading from '../../components/Loading'
import BlogForm from '../../components/BlogForm'

class BlogEdit extends Component {
  componentWillMount() {
    const id = this.props.match.params.blogId
    this.props.get(id)
  }

  render() {
    const { isRequest, update, blog, history } = this.props
    this.value = blog

    return (
      <div>
        {blog ? (
          <div>
            <BlogForm
              ref={el => (this.form = el)}
              value={blog}
              onChange={value => (this.value = value)}
            />
            <p style={{ textAlign: 'center' }}>
              <button
                type="button"
                disabled={isRequest}
                onClick={() => {
                  update(blog.id, this.value).then(() =>
                    history.replace('/blogs/' + blog.id)
                  )
                }}
              >
                保存
              </button>{' '}
            </p>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

BlogEdit = connect(
  (state, ownProps) => {
    const id = ownProps.match.params.blogId
    let blog = blogsSelectors.getBlog(state, id)

    return {
      blog,
      isRequest: blogsSelectors.getIsFormRequest(state)
    }
  },
  actions.blog
)(BlogEdit)

export default BlogEdit
