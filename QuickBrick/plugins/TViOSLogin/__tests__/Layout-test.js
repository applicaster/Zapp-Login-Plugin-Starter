import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '../src/Common/Components/Layout';
import ErrorComponent from '../src/LoginScreen/Components/ErrorComponent';

describe('Layout', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Layout />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check error component displayed', () => {
    const error = {
      message: 'message'
    };
    const tree = renderer.create(<Layout error={error} />);
    const testInstance = tree.root;

    const errorComponent = testInstance.findAllByType(ErrorComponent);
    expect(errorComponent).toHaveLength(1);
  });
});
