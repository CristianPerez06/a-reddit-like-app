import {
  getPostsListStarted,
  getPostsListSuccess,
  getPostsListFailure,
} from "../actions/postActions"
import PostDataService from "../services/post.service"

export const getPostsList =
  (page = 1) =>
  async (dispatch) => {
    dispatch(getPostsListStarted())
    try {
      const res = await PostDataService.getAll(page)
      dispatch(getPostsListSuccess(res.data))
    } catch (err) {
      dispatch(getPostsListFailure(err.message))
    }
  }
