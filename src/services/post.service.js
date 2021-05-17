import http from '../http-common'

const LIMIT = 10

class PostDataService {
  getAll (page) {
    return http.get(`/post?page=${page}&limit=${LIMIT}`)
  }

  get (id) {
    return http.get(`/post/${id}`)
  }
}

export default new PostDataService()
