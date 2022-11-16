import { CREATE, END_LOADING, START_LOADING } from '~/constants/actionsTypes'

const videoReducer = (state = { isLoading: true, videos: [] }, action) => {
  switch (action.tyoe) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case CREATE:
      return { ...state, videos: [...state.videos, action.payload] }
    default:
      return state
  }
}

export default videoReducer
