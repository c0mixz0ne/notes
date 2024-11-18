import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    isLoading: false,
    popup: {
      isOpen: false,
      type: null,
    },
  }),
  actions: {
    setIsPopupOpen(type, status) {
      this.popup.type = type
      this.popup.isOpen = status
    },
    setIsLoading(value) {
      this.isLoading = value
    },
  },
  getters: {
    getIsPopupOpen() {
      return this.popup
    },
    getIsLoading() {
      return this.isLoading
    },
  },
})
