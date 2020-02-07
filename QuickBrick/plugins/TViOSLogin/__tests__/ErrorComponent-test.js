import React from 'react';
import renderer from 'react-test-renderer';
import ErrorComponent from '../src/LoginScreen/Components/ErrorComponent';


it('ErrorComponent renders correctly', () => {
  const defaultProps = {
    error: {},
    errorBackground: ''
  };

  const tree = renderer
    .create(<ErrorComponent props={defaultProps} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
