import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Loading } from '../../components'
import { PostPreview, PostDetails } from '../Posts'
import { Button, Alert } from 'reactstrap'
import { useWindowSize } from '../../hooks'
import { useHistory } from 'react-router-dom'
import { getPostsList } from '../../asyncActions/postAsyncActions'
// import posts from '../posts.json'

// TO DO - Review breakpoint values / col-sm original value is 576px
const LIMIT = 10
const COL_SM_BREAKPOINT = 766

const Posts = (props) => {
  // Props
  const { postsObj, getPostsList } = props

  // State
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState(null)

  // Hooks
  const history = useHistory()
  const windowSize = useWindowSize()

  const totalPages = Math.ceil((postsObj.data || {}).total / LIMIT)
  const isMobile = windowSize.width <= COL_SM_BREAKPOINT
  const buttonPreviousDisabled = currentPage === 1
  const buttonNextDisabled = currentPage + 1 === totalPages

  const onPreviewClick = (value) => {
    if (isMobile) {
      history.push(`/posts/${value.id}`)
    } else {
      setSelectedPost(value)
    }
  }

  useEffect(() => {
    getPostsList(currentPage)
  }, [currentPage, getPostsList])

  return (
    <div className='row h-100'>
      <div className='col-md-4 col-xs-12 h-100' style={{ overflowX: 'hidden', overflowY: 'auto' }}>
        <div className='post-previews-list h-100'>
          <div className='pagination d-flex justify-content-between'>
            <Button
              color='secondary'
              className='m-2'
              disabled={buttonPreviousDisabled || postsObj.loading}
              onClick={() => {
                setSelectedPost()
                setCurrentPage(currentPage - 1)
              }}
            >
              {'<<<'}
            </Button>
            <Button
              color='secondary'
              className='m-2'
              disabled={buttonNextDisabled || postsObj.loading}
              onClick={() => {
                setSelectedPost()
                setCurrentPage(currentPage + 1)
              }}
            >
              {'>>>'}
            </Button>
          </div>
          {postsObj.loading && <div className='d-flex justify-content-center align-items-center h-100'><Loading /></div>}
          {!postsObj.loading && postsObj.error && <Alert color='danger'>Oops... something went wrong.</Alert>}
          {!postsObj.loading && !postsObj.error && postsObj.data && (
            postsObj.data.items.map((post, index) => {
              return (
                <PostPreview
                  key={index}
                  post={post}
                  onPreviewClick={onPreviewClick}
                  itemRead={postsObj.data.itemsRead.some(x => x.id === post.id)}
                />
              )
            })
          )}
        </div>
      </div>
      {!isMobile && <div className='col-md-8 col-xs-12 mh-100'><PostDetails post={selectedPost} /></div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    postsObj: state.posts
  }
}

const mapDispatchToProps = {
  getPostsList
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
