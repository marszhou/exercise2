export const triggerMessage = text => dispatch => {
  dispatch({
    type: 'SHOW_MESSAGE',
    text
  })

  setTimeout(() => {
    dispatch({
      type: 'HIDE_MESSAGE'
    })
  }, 1500)
}
