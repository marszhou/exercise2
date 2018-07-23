import React from 'react'
import PropTypes from 'prop-types'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import styles from '../styles.module.css'

class BlogForm extends React.Component {
  static props = {
    title: PropTypes.string,
    content: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    title: '',
    content: '',
    onChange: () => {}
  }

  clear() {
    this.title.value = ''
    this.editor.clear()
  }

  value() {
    return {
      title: this.title.value.trim(),
      content: this.editor.getContent('html')
    }
  }

  handleChange = () => {
    this.props.onChange(this.value())
  }

  render() {
    const { title, content } = this.props
    const editorProps = {
      height: 200,
      controls: ['bold', 'italic', 'underline', 'strike-through'],
      contentFormat: 'html',
      initialContent: content,
      onChange: this.handleChange
    }
    return (
      <table className={styles.blogTable}>
        <tbody>
          <tr>
            <td>标题</td>
            <td>
              <input
                type="text"
                ref={el => (this.title = el)}
                defaultValue={title}
                onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>内容</td>
            <td>
              <BraftEditor ref={el => (this.editor = el)} {...editorProps} />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default BlogForm
