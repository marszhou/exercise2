import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.css'

const Pagination = ({
  seq,
  first,
  last,
  next,
  previous,
  current,
  ellipsisLeft,
  ellipsisRight
}) => {
  return (
    <div className={styles.pagination}>
      {first && <Link to={'?page=' + first}>&lt;&lt;</Link>}
      {previous && <Link to={'?page=' + previous}>&lt;</Link>}
      {ellipsisLeft && '...'}
      {seq &&
        seq.map(page => (
          <Link
            to={'?page=' + page}
            key={page}
            className={current === page ? styles.current : ''}
          >
            {page}
          </Link>
        ))}
      {ellipsisRight && '...'}
      {next && <Link to={'?page=' + next}>&gt;</Link>}
      {last && <Link to={'?page=' + last}>&gt;&gt;</Link>}
    </div>
  )
}

export default Pagination
