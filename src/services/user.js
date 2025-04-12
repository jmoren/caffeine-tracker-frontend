import api from './api'

export async function editUser(body) {
  return api.patch(`/user/profile`, body)
}

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

export async function fetchSummary (startDate, endDate) {
  return api.get('/user/summary', { params: { start_date: startDate, end_date: endDate } })
}
