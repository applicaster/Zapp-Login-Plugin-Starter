import React from 'react'
import renderer from 'react-test-renderer'

import Login from '../Login'

describe('@Login', () => {
  describe('Render', () => {
    it('Render with default props', () => {
      const root = renderer.create(<Login />)
      expect(root.toJSON()).toMatchSnapshot()
    })
  })
})
