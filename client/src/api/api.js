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
export const getTopView = () => API.get(`videos/topview`)
export const getUserVideos = (userId) => API.get(`/videos/author?id=${userId}`)
export const getUserVideosPending = (userId) =>
  API.get(`/videos/author/pending?id=${userId}`)
export const addVideo = (data) => API.post('/videos/add', data)
export const addView = (videoId) => API.patch(`/videos/addview/${videoId}`)

//Comment
export const addComment = (comment, videoId) =>
  API.post(`/comment/add/${videoId}`, { comment })
export const getComments = (videoId) => API.get(`/comment/${videoId}`)
