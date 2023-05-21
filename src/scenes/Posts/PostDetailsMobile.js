import React, { useState, useEffect } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { Loading } from "../../components"
import { PostDetails } from "../../scenes/Posts"
import { Button, Alert } from "reactstrap"
import PostDataService from "../../services/post.service"

const PostDetailsMobile = (props) => {
  // State
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Hooks
  const { params } = useRouteMatch()
  const { postId } = params

  useEffect(() => {
    setLoading(true)

    PostDataService.get(postId)
      .then(({ data }) => {
        setPost(data)
        setError(false)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [postId])

  return (
    <div className="post-details-mobile w-100">
      <div className="buttons d-flex justify-content-end m-2">
        <Link to="/posts">
          <Button color="primary" disabled={loading}>
            Go back to list
          </Button>
        </Link>
      </div>
      {loading && <Loading />}
      {!loading && error && (
        <Alert color="danger" className="pt-3">
          Oops... something went wrong. Please refresh the page and try again.
        </Alert>
      )}
      {!loading && !error && <PostDetails post={post} />}
    </div>
  )
}

export default PostDetailsMobile
