import api from './api'

export async function allDrinks() {
  return api.get('/admin/drinks')
}

export async function getDrink(id) {
  return api.get(`/admin/drinks/${id}`)
}

export async function createDrink(body) {
  return api.post('/admin/drinks', body)
}

export async function updateDrink(id, body) {
  return api.patch(`/admin/drinks/${id}`, body)
}

export async function removeDrink(id) {
  return api.delete(`/admin/drinks/${id}`)
}
