import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../src/LoginScreen/Components/LoginForm/LoginForm';

describe('LoginForm', () => {
  it('renders correctly', () => {
    const defaultProps = {
      error: null,
      skip: false
    };
    const tree = renderer
      .create(<LoginForm props={defaultProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check skip button displayed', () => {
    const skip = true;
    const skipLabel = 'Skip';

    const testRenderer = renderer.create(
      <LoginForm skip={skip} skipLabel={skipLabel} />
    );
    const testInstance = testRenderer.root;
    const skipButton = testInstance.findByProps(`${skipLabel}`);

    expect(skipButton).toHaveLength(1);
  });
});
