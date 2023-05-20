import postReducer from "./postReducer"
import * as types from "../actions/postTypes"

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

describe("posts reducer", () => {
  describe("when item is read", () => {
    const addToViewedExpectedRes = {
      data: {
        items: [],
        itemsRead: [{ id: "1234" }],
        itemsDismissed: [],
        total: 0,
      },
      error: null,
      loading: false,
      allPostsDismissed: false,
    }

    const itemViewedAction = {
      type: types.ADD_TO_VIEWED_POSTS_LIST,
      payload: { id: "1234" },
    }

    it("should add a new item to itemsRead", () => {
      expect(postReducer(initialState, itemViewedAction)).toEqual(
        addToViewedExpectedRes
      )
    })
  })

  describe("when item is dismissed", () => {
    const itemDismissedAction = {
      type: types.ADD_TO_DISMISSED_POSTS_LIST,
      payload: { id: "1234" },
    }

    const addToDismissedExpectedRes = {
      data: {
        items: [],
        itemsRead: [],
        itemsDismissed: [{ id: "1234" }],
        total: 0,
      },
      error: null,
      loading: false,
      allPostsDismissed: false,
    }

    it("should add a new item to itemsDismissed", () => {
      expect(postReducer(initialState, itemDismissedAction)).toEqual(
        addToDismissedExpectedRes
      )
    })
  })

  describe("when all items are dismissed", () => {
    const allItemsDismissedAction = {
      type: types.DISMISS_ALL_POSTS,
    }

    const allItemsDismissedRes = {
      data: {
        items: [],
        itemsRead: [],
        itemsDismissed: [],
        total: 0,
      },
      error: null,
      loading: false,
      allPostsDismissed: true,
    }

    it("should set allItemsDismissedRes property to true", () => {
      expect(postReducer(initialState, allItemsDismissedAction)).toEqual(
        allItemsDismissedRes
      )
    })
  })
})

// TODO - Add test for GET_POSTS_LIST_STARTED
// TODO - Add test for GET_POSTS_LIST_SUCCESS
// TODO - Add test for GET_POSTS_LIST_FAILED
