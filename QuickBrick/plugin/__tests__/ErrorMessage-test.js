import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from '../src/LoginScreen/Components/ErrorMessage';


it('ErrorMessage renders correctly', () => {
  const defaultProps = {
    errorValue: '',
    customStyles: {}
  };

  const tree = renderer
    .create(<ErrorMessage props={defaultProps} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
