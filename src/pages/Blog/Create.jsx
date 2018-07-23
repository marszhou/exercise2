import React, { Component } from 'react'
import BlogForm from '../../components/BlogForm';
class BlogCreate extends Component {
  render () {
    return (
      <div className="demo">
        <BlogForm ref={el => this.form = el} onChange={(value) => console.log(value)}/>
        <p style={{textAlign: 'center'}}>
          <button type='button' onClick={() => this.form.clear()}>保存</button>{' '}
        </p>
      </div>
    )
  }
}

export default BlogCreate
