import postReducer from './postReducer'
import * as types from '../actions/postTypes'

const initialState = {
  data: {
    items: [],
    total: 0,
    itemsRead: []
  },
  loading: false,
  error: null
}

const addToViewedExpectedRes = {
  data: {
    items: [],
    itemsRead: [
      { id: '1234' }
    ],
    total: 0
  },
  error: null,
  loading: false
}

const action = {
  type: types.ADD_TO_VIEWED_POSTS_LIST,
  payload: { id: '1234' }
}

describe('posts reducer', () => {
  it('should handle ADD_TO_VIEWED_POSTS_LIST', () => {
    expect(postReducer(initialState, action)).toEqual(addToViewedExpectedRes)
  })
})

// TODO - Add test for GET_POSTS_LIST_STARTED
// TODO - Add test for GET_POSTS_LIST_SUCCESS
// TODO - Add test for GET_POSTS_LIST_FAILED
