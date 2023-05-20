import {
  GET_POSTS_LIST_STARTED,
  GET_POSTS_LIST_SUCCESS,
  GET_POSTS_LIST_FAILURE,
  ADD_TO_VIEWED_POSTS_LIST,
  ADD_TO_DISMISSED_POSTS_LIST,
  DISMISS_ALL_POSTS,
} from "../actions/postTypes"

const initialState = {
  data: {
    items: [],
    total: 0,
    itemsRead: [],
    itemsDismissed: [],
  },
  loading: false,
  error: null,
  allPostsDismissed: false,
}

const addToList = (list, item) => {
  const itemIsInList = list.some((x) => x.id === item.id)
  if (itemIsInList) return [...list]
  list.push(item)
  return list
}

export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_LIST_STARTED:
      return {
        ...state,
        loading: true,
      }
    case GET_POSTS_LIST_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          items: action.payload.data,
          total: action.payload.total,
        },
        loading: false,
      }
    case GET_POSTS_LIST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      }
    case ADD_TO_VIEWED_POSTS_LIST:
      return {
        ...state,
        data: {
          ...state.data,
          itemsRead: addToList([...state.data.itemsRead], {
            id: action.payload.id,
          }),
          // itemsRead: [
          //   ...state.data.itemsRead,
          //   { id: action.payload.id }
          // ]
        },
      }
    case ADD_TO_DISMISSED_POSTS_LIST:
      return {
        ...state,
        data: {
          ...state.data,
          itemsDismissed: addToList([...state.data.itemsDismissed], {
            id: action.payload.id,
          }),
          // itemsDimissed: [
          //   ...state.data.itemsDimissed,
          //   { id: action.payload.id }
          // ]
        },
      }
    case DISMISS_ALL_POSTS:
      return {
        ...state,
        allPostsDismissed: true,
      }
    default:
      return state
  }
}
