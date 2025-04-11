import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({ user: {}, loggedIn: false }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    login(data) {
      this.user = data.attrs
      this.loggedIn = true
    },
    logout() {
      this.user = {}
      this.loggedIn = false
    },
  },
})
