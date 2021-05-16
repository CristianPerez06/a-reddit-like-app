import React, { useState, useEffect } from 'react'
import { Loading } from '../../components'
import { PostPreview, PostDetails } from '../Posts'
import { Button, Alert } from 'reactstrap'
import { useWindowSize } from '../../hooks'
import { useHistory } from 'react-router-dom'
import PostsDataService from '../../services/posts.service'

// import posts from '../posts.json'

const LIMIT = 10
// TO DO - Review breakpoint values / col-sm original value is 576px
const COL_SM_BREAKPOINT = 766

const Posts = () => {
  // State
  const [currentPage, setCurrentPage] = useState(1)
  const [buttonPreviousDisabled, setButtonPreviousDisabled] = useState(false)
  const [buttonNextDisabled, setButtonNextDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)

  // Hooks
  const history = useHistory()
  const windowSize = useWindowSize()

  const isMobile = windowSize.width <= COL_SM_BREAKPOINT

  const onPreviewClick = (value) => {
    if (isMobile) {
      history.push(`/posts/${value.id}`)
    } else {
      setSelectedPost(value)
    }
  }

  useEffect(() => {
    setLoading(true)

    // const mappedPosts = posts.data.map((post, key) => {
    //   return {
    //     owner: post.owner,
    //     id: post.id,
    //     image: post.image,
    //     publishDate: post.publishDate,
    //     text: post.text,
    //     tags: post.tags,
    //     link: post.link,
    //     likes: post.likes
    //   }
    // })
    // setData(mappedPosts)
    // setLoading(false)

    PostsDataService.getAll(currentPage)
      .then(({ data }) => {
        setPosts({ items: data.data, total: data.total })
        setLoading(false)
        setButtonPreviousDisabled(currentPage === 1)
        const totalPages = Math.ceil(data.total / LIMIT)
        setButtonNextDisabled(currentPage + 1 === totalPages)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
      .finally(() => {
        setError(false)
        setLoading(false)
      })
  }, [currentPage])

  return (
    <div className='row h-100'>
      <div className='col-md-4 col-xs-12 h-100' style={{ overflowX: 'hidden', overflowY: 'auto' }}>
        <div className='post-previews-list h-100'>
          <div className='pagination d-flex justify-content-between'>
            <Button
              color='secondary'
              className='m-2'
              disabled={buttonPreviousDisabled || loading}
              onClick={() => {
                setCurrentPage(currentPage - 1)
              }}
            >
              {'<<<'}
            </Button>
            <Button
              color='secondary'
              className='m-2'
              disabled={buttonNextDisabled || loading}
              onClick={() => {
                setCurrentPage(currentPage + 1)
              }}
            >
              {'>>>'}
            </Button>
          </div>
          {loading && <div className='d-flex justify-content-center align-items-center h-100'><Loading /></div>}
          {!loading && error && <Alert color='danger'>Oops... something went wrong.</Alert>}
          {!loading && !error && (
            posts.items.map((post, index) => {
              return <PostPreview key={index} post={post} onPreviewClick={onPreviewClick} />
            })
          )}
        </div>
      </div>
      {!isMobile && <div className='col-md-8 col-xs-12 mh-100'><PostDetails post={selectedPost} /></div>}
    </div>
  )
}

export default Posts
