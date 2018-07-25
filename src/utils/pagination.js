import _ from 'lodash'

const makeSeq = (current, length, total) => {
  if (length >= total) return [...Array(total)].map((v, i) => i + 1)
  const ret = [current]
  let canBackward = true
  let canForward = true
  const backward = seq => {
    const first = _.first(seq)
    if (first - 1 > 0) {
      seq.unshift(first - 1)
    } else {
      canBackward = false
    }
  }
  const forward = seq => {
    const last = _.last(seq)
    if (last + 1 <= total) {
      seq.push(last + 1)
    } else {
      canForward = false
    }
  }

  while ((canBackward || canForward) && ret.length < length) {
    if (canBackward) backward(ret)
    if (canForward) forward(ret)
  }
  return ret
}

export const calcuatePagination = (currentPage, pageSize, itemCount, seqLen=5) => {
  if (itemCount === 0) return null

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount === 0) return null
  const pagination = {}
  if (currentPage > 1) pagination.previous = currentPage - 1
  if (currentPage < pageCount) pagination.next = currentPage + 1

  const seq = makeSeq(currentPage, seqLen, pageCount)
  pagination.seq = seq
  if (seq.indexOf(1) === -1) pagination.first = 1
  if (seq.indexOf(pageCount) === -1) pagination.last = pageCount
  if (pagination.first && pagination.first < Math.min(...seq) - 1)
    pagination.ellipsisLeft = true
  if (pagination.last && pagination.last > Math.max(...seq) + 1)
    pagination.ellipsisRight = true
  return pagination
}

// console.log(calcuatePagination(9, 10, 100, 6))