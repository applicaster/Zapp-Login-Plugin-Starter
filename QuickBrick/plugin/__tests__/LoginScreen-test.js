import React from 'react';
import { create, act } from 'react-test-renderer';
import LoginScreen from '../src/LoginScreen/Screens/LoginScreen/LoginScreen';


describe('LoginScreen', () => {
  const screenData = {
    general: {}
  };

  it('renders correctly', () => {
    const tree = create(<LoginScreen screenData={screenData} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
