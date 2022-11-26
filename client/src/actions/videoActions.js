import {
  DISLIKE,
  END_LOADING,
  FETCH_ALL,
  FETCH_VIDEO,
  LIKE,
  RELOAD,
  START_LOADING,
} from '~/constants/actionsTypes.js'
import * as api from '../api/api.js'

export const fetchVideos = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchVideos()

    dispatch({ type: FETCH_ALL, payload: { data } })
  } catch (error) {
    console.log(error)
  }
}

export const getVideo = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.getVideo(videoId)

    dispatch({ type: FETCH_VIDEO, payload: { video: data } })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const addVideo = (formData) => async (dispatch) => {
  try {
    await api.addVideo(formData)
    dispatch({ type: RELOAD })
  } catch (error) {
    console.log(error)
  }
}

export const like = (videoId, userId) => async (dispatch) => {
  try {
    await api.like(videoId)
    dispatch({ type: LIKE, payload: userId })
  } catch (error) {
    console.log(error)
  }
}

export const dislike = (videoId, userId) => async (dispatch) => {
  try {
    await api.dislike(videoId)
    dispatch({ type: DISLIKE, payload: userId })
  } catch (error) {
    console.log(error)
  }
}

export const addView = (videoId) => async () => {
  try {
    await api.addView(videoId)
  } catch (error) {
    console.log(error)
  }
}

export const deleteVideo = (videoId) => async (dispatch) => {
  try {
    await api.deleteVideo(videoId)
    dispatch({ type: RELOAD })
  } catch (error) {
    console.log(error)
  }
}
