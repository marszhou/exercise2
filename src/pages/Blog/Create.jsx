import React, { Component } from 'react'
import BlogForm from '../../components/BlogForm'
import {connect} from 'react-redux'
import actions from '../../actions';
import { blogSelectors } from '../../reducers';
class BlogCreate extends Component {
  value = {}

  render() {
    const {isRequest, create} = this.props

    return (
      <div className="demo">
        <BlogForm
          ref={el => (this.form = el)}
          onChange={value => this.value = value}
        />
        <p style={{ textAlign: 'center' }}>
          <button type="button" disabled={isRequest} onClick={() => {
            create(this.value).then(() => this.form.clear())
          }}>
            保存
          </button>{' '}
        </p>
      </div>
    )
  }
}

BlogCreate = connect(state => ({
  isRequest: blogSelectors.getIsFormRequest(state)
}), actions.blog)(BlogCreate)

export default BlogCreate
