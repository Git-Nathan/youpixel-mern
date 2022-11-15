import * as api from '../api/api.js'

export const addVideo = (formData) => async (dispatch) => {
  try {
    await api.addVideo(formData)
  } catch (error) {
    console.log(error)
  }
}
