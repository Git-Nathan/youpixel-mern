import * as api from '../api/api.js'

export const addComment = (comment, videoId) => async (dispatch) => {
  try {
    await api.addComment(comment, videoId)
  } catch (error) {
    console.log(error)
  }
}
