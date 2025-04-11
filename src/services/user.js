import api from './api'

export async function fetchEntries() {
  return api.get('/user/user_drinks')
}

export async function addRecord(body) {
  return api.post('/user/user_drinks', body)
}

export async function updateRecord(id, body) {
  return api.patch(`/users/user_drinks/${id}`, body)
}

export async function removeRecord(id) {
  return api.delete(`/users/user_drinks/${id}`)
}
