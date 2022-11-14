import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5002' })

export const signIn = (data) => API.post('/auth/google', data)
