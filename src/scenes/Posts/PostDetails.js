import React from "react"
import { Card, CardTitle, CardBody, CardImg } from "reactstrap"

const PostDetails = (props) => {
  const { post } = props

  if (!post)
    return (
      <Card className="h-100 shadow ml-2 mr-2">
        <CardTitle className="pt-2 pb-2 text-center" tag="h4">
          {"No post available to display"}
        </CardTitle>
      </Card>
    )

  return (
    <Card className="h-100 shadow ml-2 mr-2" style={{ overflowY: "hidden" }}>
      <CardBody>
        <CardTitle className="pt-2 pb-2" tag="h2">
          {post.text}
        </CardTitle>
        <div
          className="image-container d-flex justify-content-center"
          style={{ height: 80 + "%" }}
        >
          <CardImg
            className="rounded"
            src={post.image}
            alt={post.id}
            style={{ objectFit: "cover" }}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default PostDetails
