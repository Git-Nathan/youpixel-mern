import { CREATE } from '~/constants/actionsTypes.js'
import * as api from '../api/api.js'

export const addVideo = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addVideo(formData)
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
