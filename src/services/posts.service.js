import http from '../http-common'

const LIMIT = 10

class PostsDataService {
  getAll (page) {
    return http.get(`/post?page=${page}&limit=${LIMIT}`)
  }

  get (id) {
    return http.get(`/posts/${id}`)
  }
}

export default new PostsDataService()
