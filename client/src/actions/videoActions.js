import {
  CREATE,
  END_LOADING,
  FETCH_ALL,
  FETCH_VIDEO,
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
    const { data } = await api.addVideo(formData)
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
