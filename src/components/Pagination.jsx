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
      {previous && <Link to={'?page=' + previous}>&lt;</Link>}
      {first && <Link to={'?page=' + first}>{first}</Link>}

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
      {last && <Link to={'?page=' + last}>{last}</Link>}
      {next && <Link to={'?page=' + next}>&gt;</Link>}
    </div>
  )
}

export default Pagination
