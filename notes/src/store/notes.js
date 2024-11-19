import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
  }),

  actions: {
    setNotes(data) {
      this.notes = data
    },
    setNewNote(data) {
      this.notes = [data, ...this.notes]
    },
    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id)
    },
  },

  getters: {
    getNotes: (state) => {
      return state.notes
    },
  },
})
