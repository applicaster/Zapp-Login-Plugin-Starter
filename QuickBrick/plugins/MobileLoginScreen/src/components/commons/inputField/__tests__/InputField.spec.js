import React from 'react'
import renderer from 'react-test-renderer'

import InputField from '../InputField'

describe('@InputField', () => {
  describe('Render', () => {
    it('Render with default props', () => {
      const labelText = 'Test Text'
      const root = renderer.create(<InputField {...labelText} />)
      expect(root.toJSON()).toMatchSnapshot()
    })
  })
})
