import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // Your Rails API
  withCredentials: true, // ⚠️ This enables cookie auth
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
