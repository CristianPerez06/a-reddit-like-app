import React from "react"
import { Spinner } from "reactstrap"

const Loading = () => {
  return (
    <div className="d-flex justify-content-center p-5">
      <Spinner
        color="primary"
        style={{ height: 100 + "px", width: 100 + "px" }}
      />
    </div>
  )
}

export default Loading
