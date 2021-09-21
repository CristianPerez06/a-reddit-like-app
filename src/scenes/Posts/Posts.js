import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Loading } from '../../components'
import { PostPreview, PostDetails } from '../Posts'
import { Button, Alert } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useWindowSize } from '../../hooks'
import { useHistory } from 'react-router-dom'
import { addToViewedPostsList, dismissAllPosts } from '../../actions/postActions'
import { getPostsList } from '../../asyncActions/postAsyncActions'
import './styles.css'

// TO DO - Review breakpoint values / col-sm original value is 576px
const LIMIT = 10
const COL_SM_BREAKPOINT = 766

const Posts = (props) => {
  // Props
  const { postsObj, getPostsList, addToViewedPostsList, dismissAllPosts } = props
  const { loading, error, allPostsDismissed, data } = postsObj
  const { items, itemsRead } = data
  const itemsToShow = items.filter(x => !postsObj.data.itemsDismissed.some(y => y.id === x.id))

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
    addToViewedPostsList(value.id)
    if (isMobile) {
      history.push(`/posts/${value.id}`)
    } else {
      setSelectedPost(value)
    }
  }

  const onSubmitClick = (value) => {
    // ......
  }

  const onCancelClick = (value) => {
    // ......
  }

  useEffect(() => {
    getPostsList(currentPage)
  }, [currentPage, getPostsList])

  return (
    <div className='row h-100 w-100'>
      <div className='col-md-3 col-xs-12 h-100' style={{ overflowX: 'hidden', overflowY: 'auto' }}>
        <div className='post-previews-list h-100'>
          <div className='d-flex justify-content-center'>
            <Button
              color='secondary'
              className='m-2 w-100'
              disabled={loading || allPostsDismissed}
              onClick={() => {
                dismissAllPosts()
              }}
            >
              Dismiss all
            </Button>
          </div>
          <div className='pagination d-flex justify-content-between'>
            <Button
              color='secondary'
              className='m-2 w-100'
              disabled={buttonPreviousDisabled || loading}
              onClick={() => {
                setSelectedPost()
                setCurrentPage(currentPage - 1)
              }}
            >
              PREVIOUS
            </Button>
            <Button
              color='secondary'
              className='m-2 w-100'
              disabled={buttonNextDisabled || loading}
              onClick={() => {
                setSelectedPost()
                setCurrentPage(currentPage + 1)
              }}
            >
              NEXT
            </Button>
          </div>
          {loading && <div className='d-flex justify-content-center align-items-center h-100'><Loading /></div>}
          {!loading && error && <Alert color='danger' className='mt-3'>Oops... something went wrong.</Alert>}
          {!loading && !error && itemsToShow && !allPostsDismissed && (
            <TransitionGroup>
              {itemsToShow.map((post) => {
                return (
                  <CSSTransition key={post.id} timeout={700} classNames='item'>
                    <PostPreview
                      post={post}
                      onPreviewClick={onPreviewClick}
                      itemRead={itemsRead.some(x => x.id === post.id)}
                    />
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
          )}
          {allPostsDismissed && <Alert color='warning' className='mt-3'>There's nothing to show.</Alert>}
        </div>
      </div>
      {!isMobile && <div className='col-md-9 col-xs-12 mh-100'><PostDetails post={selectedPost} /></div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    postsObj: state.posts
  }
}

const mapDispatchToProps = {
  getPostsList,
  addToViewedPostsList,
  dismissAllPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
