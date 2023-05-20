import React from "react"
import { Card, CardTitle, CardBody, CardImg } from "reactstrap"

const PostDetails = (props) => {
  const { post } = props

  if (!post) return <Card className="h-100 shadow" />

  return (
    <Card className="h-100 shadow" style={{ overflowY: "hidden" }}>
      <CardBody>
        <CardTitle className="pt-2 pb-2" tag="h2">
          {post.text}
        </CardTitle>
        <div
          className="image-container d-flex justify-content-center"
          style={{ maxHeight: 780 + "px" }}
        >
          <CardImg
            src={post.image}
            alt={post.id}
            style={{ objectFit: "scale-down" }}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default PostDetails
