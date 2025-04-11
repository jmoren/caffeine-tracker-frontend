import api from './api'

export async function login(user) {
  return api.post('/login', { email: user.email, password: user.password })
}

export async function logout() {
  return api.delete('/logout')
}

export async function fetchCurrentUser() {
  return api.get('/profile')
}
