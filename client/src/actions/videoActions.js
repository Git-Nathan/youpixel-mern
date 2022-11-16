import { CREATE, FETCH_ALL } from '~/constants/actionsTypes.js'
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

export const addVideo = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addVideo(formData)
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
