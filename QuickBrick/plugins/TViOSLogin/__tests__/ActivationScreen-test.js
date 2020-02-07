import React from 'react';
import { create, act } from 'react-test-renderer';
import SignInScreen from '../src/2ndActivationScreen/Screens/SignInScreen/SignInScreen';


describe('SignInScreen', () => {
  const screenData = {
    general: {}
  };

  it('renders correctly', () => {
    const tree = create(<SignInScreen screenData={screenData} loading={false} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check spinners displayed', () => {
    const testRenderer = create(
      <SignInScreen screenData={screenData} loading={true} />
    );
    const testInstance = testRenderer.root;
    const spinners = testInstance.findAllByType('ActivityIndicator');

    expect(spinners).toHaveLength(2);
  });
});
