import * as api from '../api/api.js'

export const addComment = (comment, videoId) => async (dispatch) => {
  try {
    const { data } = await api.addComment(comment, videoId)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
