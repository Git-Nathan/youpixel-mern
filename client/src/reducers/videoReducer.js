import {
  CREATE,
  END_LOADING,
  FETCH_ALL,
  START_LOADING,
} from '~/constants/actionsTypes'

const videoReducer = (state = { isLoading: true, videos: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_ALL:
      return { ...state, videos: action.payload.data }
    case CREATE:
      return { ...state, videos: [...state.videos, action.payload] }
    default:
      return state
  }
}

export default videoReducer
