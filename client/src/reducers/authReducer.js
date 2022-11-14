import { AUTH, LOGOUT } from '~/constants/actionsTypes'

const authReducer = (state = { currentUser: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))

      return { ...state, currentUser: action.data }
    case LOGOUT:
      localStorage.clear()

      return { ...state, currentUser: null }
    default:
      return state
  }
}

export default authReducer
