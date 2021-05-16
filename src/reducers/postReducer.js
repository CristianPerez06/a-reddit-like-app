import {
  GET_POSTS_LIST_STARTED,
  GET_POSTS_LIST_SUCCESS,
  GET_POSTS_LIST_FAILURE,
  ADD_TO_VIEWED_POSTS_LIST
} from '../actions/postTypes'

const initialState = {
  data: {
    items: [],
    total: 0,
    itemsRead: []
  },
  loading: false,
  error: null
}

export default function common (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_LIST_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_POSTS_LIST_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          items: action.payload.data,
          total: action.payload.total
        },
        loading: false
      }
    case GET_POSTS_LIST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      }
    case ADD_TO_VIEWED_POSTS_LIST:
      return {
        ...state,
        data: {
          ...state.data,
          itemsRead: [
            ...state.data.itemsRead,
            { id: action.payload.id }
          ]
        }
      }
    default:
      return state
  }
}
