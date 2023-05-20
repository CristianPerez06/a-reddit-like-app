import * as actions from "../actions/postActions"
import * as types from "../actions/postTypes"

describe("actions", () => {
  it("should create an action to start getting a posts list", () => {
    const expectedAction = {
      type: types.GET_POSTS_LIST_STARTED,
    }
    expect(actions.getPostsListStarted()).toEqual(expectedAction)
  })

  it("should create an action for getting successfully a posts list", () => {
    const expectedAction = {
      type: types.GET_POSTS_LIST_SUCCESS,
      payload: { data: "someData" },
    }
    expect(actions.getPostsListSuccess({ data: "someData" })).toEqual(
      expectedAction
    )
  })

  it("should create an action for errors on getting a posts list", () => {
    const expectedAction = {
      type: types.GET_POSTS_LIST_FAILURE,
      payload: { error: "errorMessage" },
    }
    expect(actions.getPostsListFailure({ error: "errorMessage" })).toEqual(
      expectedAction
    )
  })

  it("should create an action to add a viewed post id", () => {
    const expectedAction = {
      type: types.ADD_TO_VIEWED_POSTS_LIST,
      payload: { id: "1" },
    }
    expect(actions.addToViewedPostsList("1")).toEqual(expectedAction)
  })
})
