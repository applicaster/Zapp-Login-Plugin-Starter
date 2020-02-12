import React from 'react'
import renderer from 'react-test-renderer'

import RoundedButton from '../RoundedButton'

describe('@RoundedButton', () => {
  describe('Render', () => {
    it('Render with default props', () => {
      const text = 'Test'
      const root = renderer.create(<RoundedButton text={text} />)
      expect(root.toJSON()).toMatchSnapshot()
    })
  })
})
