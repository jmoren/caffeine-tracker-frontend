import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({ user: {}, loggedIn: false }),
  actions: {
    login(data) {
      this.user = data
      this.loggedIn = true
    },
    logout() {
      this.user = {}
      this.loggedIn = false
    },
  },
})
