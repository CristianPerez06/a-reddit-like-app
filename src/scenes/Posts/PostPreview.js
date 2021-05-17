import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle
} from 'reactstrap'
import { formatDistance } from 'date-fns'
import { addToDismissedPostsList } from '../../actions/postActions'

const PostPreview = (props) => {
  const { post, onPreviewClick, itemRead = false, addToDismissedPostsList } = props

  const formattedPublishedDate = formatDistance(
    new Date(post.publishDate),
    new Date(),
    { addSuffix: true }
  )

  return (
    <Card className='shadow m-1'>
      <CardBody onClick={() => { onPreviewClick(post) }} style={{ cursor: 'pointer' }}>
        {!itemRead && (
          <span className='unread-badge d-inline-block badge badge-secondary float-right' style={{ fontSize: 10 + 'px' }}>
            Unread
          </span>
        )}
        <span className='posted-by-and-date d-inline-block' style={{ fontSize: 10 + 'px' }}>
            Posted by {`${post.owner.firstName} ${post.owner.lastName} - ${formattedPublishedDate} `}
        </span>
        <CardTitle tag='h5'>
          {post.text}
        </CardTitle>
        <CardImg variant='bottom' src={post.image} />
      </CardBody>
      <Button
        color='secondary'
        className='m-2'
        onClick={() => {
          addToDismissedPostsList(post.id)
        }}
      >
          Dismiss
      </Button>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  addToDismissedPostsList
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview)
