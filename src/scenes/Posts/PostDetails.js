import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { formatDistance } from 'date-fns'
import { addToViewedPostsList } from '../../actions/postActions'

const PostDetails = (props) => {
  const { post, addToViewedPostsList } = props

  const getFormattedDate = (date) => {
    if (!date) return null

    let formattedPublishedDate = null
    if (post) {
      formattedPublishedDate = formatDistance(
        new Date(post.publishDate),
        new Date(),
        { addSuffix: true }
      )
    }
    return formattedPublishedDate
  }

  useEffect(() => {
    if (post) {
      addToViewedPostsList(post.id)
    }
  }, [post, addToViewedPostsList])

  return (
    <Card className='h-100 shadow' style={{ overflowY: 'hidden' }}>
      {post && (
        <div>
          <CardBody>
            <span className='posted-by-and-date d-inline-block'>
              Posted by {`${post.owner.firstName} ${post.owner.lastName} - ${getFormattedDate((post || {}).publishDate)} `}
            </span>
            <CardTitle className='pt-2 pb-2' tag='h2'>
              {post.text}
            </CardTitle>
          </CardBody>
          <div className='image-container d-flex justify-content-center'>
            <CardImg src={post.image} alt={post.id} style={{ maxWidth: 470 + 'px' }} />
          </div>
        </div>
      )}
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  addToViewedPostsList
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
