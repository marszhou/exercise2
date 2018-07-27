import React from 'react'
import moment from 'moment'
import styles from '../styles.module.css'
moment.locale('zh-cn')

const BlogItemList = ({ items }) => {
  return (
    <table className={styles.blogList}>
      <thead>
        <tr>
          <th className={styles.blogListTitle}>标题</th>
          <th className={styles.blogListUser}>作者</th>
          <th className={styles.blogListCreateTime}>创建时间</th>
        </tr>
      </thead>

      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.user.username}</td>
            <td>{moment(item.create_time).format('YYYY-MM-DD HH:mm')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BlogItemList
