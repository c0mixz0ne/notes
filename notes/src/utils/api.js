import axios from 'axios'
import { useAuthStore } from '@/store/user';

const url = import.meta.env.VITE_API_URL

export const registration = async (data) => {
  await axios.post(`${url}/reg`, data)
  login({ email: data.email, password: data.password })
}

export const auth = async () => {
  const authStore = useAuthStore()
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${url}/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    authStore.setAuthUser({ email: data.email })
    return data
  }
}

export const login = async (data) => {
  const res = await axios.post(`${url}/auth`, { email: data.email, password: data.password })
  const token = res.data.accessToken
  localStorage.setItem('token', token)

  auth()
}

export const logout = () => {
  const authStore = useAuthStore()
  localStorage.removeItem('token')
  authStore.setAuthUser({})
  // user.dispatch('setAuthUser', {})
  // notes.dispatch('setNotes', [])
}
