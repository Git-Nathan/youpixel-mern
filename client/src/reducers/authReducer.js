import { AUTH, LOGOUT, SUBSCRIBTION } from '~/constants/actionsTypes'

const authReducer = (state = { reload: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))

      return { ...state }
    case SUBSCRIBTION: {
      let user = {
        ...JSON.parse(localStorage.getItem('profile')),
        result: action.data.updatedUser,
        subscribedUsers: action.data.subscribedUsers,
      }
      localStorage.setItem('profile', JSON.stringify({ ...user }))
      return { ...state, reload: !state.reload }
    }
    case LOGOUT:
      localStorage.clear()
      return { ...state }
    default:
      return state
  }
}

export default authReducer
