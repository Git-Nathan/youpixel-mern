import { AUTH, SUBSCRIBTION } from '~/constants/actionsTypes'
import * as api from '../api/api.js'

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: AUTH, data })
  } catch (error) {
    console.log(error)
  }
}

export const sub = (id) => async (dispatch) => {
  try {
    await api.sub(id)
    // dispatch({ type: SUBSCRIBTION, id })
  } catch (error) {
    console.log(error)
  }
}

export const unsub = (id) => async (dispatch) => {
  try {
    await api.unsub(id)
    // dispatch({ type: SUBSCRIBTION, id })
  } catch (error) {
    console.log(error)
  }
}
