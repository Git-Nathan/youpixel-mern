import { AUTH } from '~/constants/actionsTypes'
import * as api from '../api/api.js'

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: AUTH, data })
  } catch (error) {
    console.log(error)
  }
}
