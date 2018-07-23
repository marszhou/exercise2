import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import styles from '../../styles.module.css'
class BlogCreate extends Component {
  render () {

    const editorProps = {
      height: 200,
      controls: [
        'bold', 'italic', 'underline', 'strike-through',
      ],
      contentFormat: 'html',
      initialContent: '<p>Hello World!</p>',
      onChange: this.handleChange,
    }

    return (
      <div className="demo">
        <table className={styles.blogTable}>
          <tbody>
            <tr >
              <td >标题</td>
              <td><input type='text' /></td>
            </tr>
            <tr>
              <td >内容</td>
              <td><BraftEditor {...editorProps}/></td>
            </tr>

          </tbody>
        </table>


      </div>
    )

  }

  handleChange = (content) => {
    console.log(content)
  }

}

export default BlogCreate
