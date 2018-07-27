import React from 'react'
import styles from '../styles.module.css'

const Loading = ({style={}}) => {
  return <div className={styles.loading} style={style}/>
}

export default Loading
