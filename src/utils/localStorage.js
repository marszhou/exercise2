export const saveLoginInfo = data =>
  localStorage.setItem('login', JSON.stringify(data))

export const loadLoginInfo = () => {
  const s = localStorage.getItem('login')
  return JSON.parse(s) || {}
}

export const deleteLoginInfo = () => localStorage.removeItem('login')
