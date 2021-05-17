import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle
} from 'reactstrap'
import { formatDistance } from 'date-fns'

const PostPreview = (props) => {
  const { post, onPreviewClick, itemRead = false } = props

  const formattedPublishedDate = formatDistance(
    new Date(post.publishDate),
    new Date(),
    { addSuffix: true }
  )

  return (
    <Card className='shadow m-1' onClick={() => { onPreviewClick(post) }} style={{ cursor: 'pointer' }}>
      <CardBody>
        {!itemRead && (
          <span className='unread-badge badge badge-secondary float-right' style={{ fontSize: 10 + 'px' }}>
              Unread
          </span>
        )}

        <span className='posted-by-and-date d-inline-block' style={{ fontSize: 10 + 'px' }}>
            Posted by {`${post.owner.firstName} ${post.owner.lastName} - ${formattedPublishedDate} `}
        </span>
        <CardTitle className='title' tag='h5'>
          {post.text}
        </CardTitle>
        <CardImg className='image-preview' variant='bottom' src={post.image} />
      </CardBody>
    </Card>
  )
}

export default PostPreview
