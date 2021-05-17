import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Loading } from '../../components'
import { PostDetails } from '../../scenes/Posts'
import { Button, Alert } from 'reactstrap'
import PostDataService from '../../services/post.service'

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
    <div className='post-details-mobile'>
      <div className='buttons d-flex justify-content-end'>
        <Link to='/posts'>
          <Button color='secondary' className='m-2' disabled={loading}>
            Go back to list
          </Button>
        </Link>
      </div>
      {loading && <Loading />}
      {!loading && error && <Alert color='danger'>Oops... something went wrong.</Alert>}
      {!loading && !error && <PostDetails post={post} />}
    </div>
  )
}

export default PostDetailsMobile
