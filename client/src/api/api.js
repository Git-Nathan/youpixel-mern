import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5002' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = JSON.parse(
      localStorage.getItem('profile'),
    ).token
  }

  return req
})

// User
export const signIn = (data) => API.post('/users/google', data)
export const fetchChannel = (userId) => API.get(`/users/find/${userId}`)

//Video
export const fetchVideos = () => API.get(`/videos`)
export const addVideo = (data) => API.post('/videos/add', data)
