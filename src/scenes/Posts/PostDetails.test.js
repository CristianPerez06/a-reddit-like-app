import React from "react"
import { mount } from "enzyme"
import { Provider } from "react-redux"
import PostDetails from "./PostDetails"
import configureStore from "redux-mock-store"

const mockStore = configureStore([])

const post = {
  id: "1234",
  image: "post-image.jpg",
  publishDate: "2020-05-22T06:33:02.593Z",
  text: "the post title",
  owner: {
    id: "1234",
    email: "john.doe@mail.com",
    picture: "owner-image.jpg",
    firstName: "John",
    lastName: "Doe",
  },
}

describe("In Post details section", () => {
  const store = mockStore({
    data: {
      items: [],
      total: 0,
      itemsRead: [],
      itemsDismissed: [],
    },
  })

  const wrapper = mount(
    <Provider store={store}>
      <PostDetails post={post} />
    </Provider>
  )

  it("should show a title", () => {
    const title = wrapper.find(".card-title")
    expect(title.text()).toEqual("the post title")
  })

  it("should show an image", () => {
    const imageContainer = wrapper.find(".image-container")
    expect(imageContainer.length).toEqual(1)
  })

  // TO DO - Make this work
  // it('should dispatch an action', () => {
  // })
})
