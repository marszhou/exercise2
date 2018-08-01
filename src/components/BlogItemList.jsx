import React from 'react'
import moment from 'moment'
import {Link, withRouter } from 'react-router-dom'
import styles from '../styles.module.css'
moment.locale('zh-cn')

const BlogItemList = ({ items }) => {

  return items.length > 0 ? (
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
            <td><Link to={`/blogs/${item.id}`}>{item.title}</Link></td>
            <td><Link to={`/blogs/author/${item.user.id}`}>{item.user.username}</Link></td>
            <td>{moment(item.create_time).format('YYYY-MM-DD HH:mm')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (<div className={styles.blogListEmpty}>空空如也</div>)
}

export default (BlogItemList)
