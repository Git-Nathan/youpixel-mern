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
export const fetchChannel = (userId) => API.get(`/users/find/${userId}`)
export const signIn = (data) => API.post('/users/google', data)
export const like = (videoId) => API.patch(`/users/like/${videoId}`)
export const dislike = (videoId) => API.patch(`/users/dislike/${videoId}`)
export const sub = (channelId) => API.patch(`/users/sub/${channelId}`)
export const unsub = (channelId) => API.patch(`/users/unsub/${channelId}`)

//Video
export const fetchVideos = () => API.get(`/videos`)
export const getVideo = (videoId) => API.get(`/videos/${videoId}`)
export const addVideo = (data) => API.post('/videos/add', data)
