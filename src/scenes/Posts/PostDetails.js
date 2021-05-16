import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle } from 'reactstrap'
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
        <CardBody>
          <span className='d-inline-block'>
            Posted by {`${post.owner.firstName} ${post.owner.lastName} - ${getFormattedDate((post || {}).publishDate)} `}
          </span>
          <CardTitle tag='h2' className='pt-2 pb-2'>
            {post.text}
          </CardTitle>
          <div className='image-container'>
            <img src={post.image} className='h-100 w-100' alt={post.id} />
          </div>
        </CardBody>
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
