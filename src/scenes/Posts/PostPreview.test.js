import React from 'react'
import { shallow } from 'enzyme'
import PostPreview from './PostPreview'

const post = {
  id: '1234',
  image: 'post-image.jpg',
  publishDate: '2020-05-22T06:33:02.593Z',
  text: 'the post title',
  owner: { id: '1234', email: 'john.doe@mail.com', picture: 'owner-image.jpg', firstName: 'John', lastName: 'Doe' }
}

describe('In Post preview section', () => {

  describe('when Post is unread', () => {
    const wrapper = shallow(<PostPreview post={post} onPreviewClick={() => {}} itemRead={false} />)

    it('should show the Unread badge', () => {
      const unreadBadgeWrapper = wrapper.find('.unread-badge')
      expect(unreadBadgeWrapper.length).toEqual(1)
    })
  })

  describe('when Post is read', () => {
    const wrapper = shallow(<PostPreview post={post} onPreviewClick={() => {}} itemRead />)

    it('should show not the Unread badge', () => {
      const readBadgeWrapper = wrapper.find('.unread-badge')
      expect(readBadgeWrapper.length).toEqual(0)
    })
  })

  describe('In all cases', () => {
    const wrapper = shallow(<PostPreview post={post} onPreviewClick={() => {}} itemRead={false} />)

    it('should show a title', () => {
      const title = wrapper.find('.title')
      expect(title.dive().text()).toEqual('the post title')
    })
    it('should show posted date and owner info', () => {
      const title = wrapper.find('.posted-by-and-date')
      expect(title.text()).toEqual('Posted by John Doe - 12 months ago ')
    })
    it('should show an image', () => {
      const imageContainer = wrapper.find('.image-preview')
      expect(imageContainer.length).toEqual(1)
    })
  })
})
