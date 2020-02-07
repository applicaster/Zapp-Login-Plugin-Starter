import React from 'react';
import renderer from 'react-test-renderer';
import QRCode from '../src/2ndActivationScreen/Components/QRCode';


it('QRCode renders correctly', () => {
  const tree = renderer
    .create(<QRCode />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
