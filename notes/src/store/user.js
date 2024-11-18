import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authUser: {},
  }),
  actions: {
    setAuthUser(data) {
      this.authUser = data
    },
  },
  getters: {
    getAuthUser() {
      return this.authUser
    },
  },
})
