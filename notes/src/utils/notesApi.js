import axios from 'axios'
import { useNotesStore } from '@/store/notes'

const url = import.meta.env.VITE_API_URL

export const getAll = async () => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${url}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const notesStore = useNotesStore()
    notesStore.setNotes(data)
    // console.log(notesStore.getNotes)
    return data
  }
}

export const addNew = async ({ title, content }) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    const { data } = await axios.post(
      `${url}/notes`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    const notesStore = useNotesStore()
    notesStore.setNewNote(data)
  }
}

export const deleteOne = async (id) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    await axios.delete(`${url}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    const notesStore = useNotesStore()
    notesStore.deleteNote(id)
  }
}
