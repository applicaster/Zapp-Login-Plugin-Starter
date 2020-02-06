import React from 'react';
import renderer from 'react-test-renderer';
import TextBlock from '../src/2ndActivationScreen/Components/TextBlock';

describe('TextBlock', () => {
  it('renders correctly', () => {
    const defaultProps = {
      goTo: '',
      activationUrl: '',
      codeInstructions: '',
      loading: false,
      customStyles: {},
      pinCode: ''
    };
    const tree = renderer
      .create(<TextBlock props={defaultProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check loading indicator displayed', () => {
    const props = {
      loading: true
    };

    const testRenderer = renderer.create(<TextBlock props={props} />);
    const testInstance = testRenderer.root;

    const spinner = testInstance.findAllByType('ActivityIndicator')[0];
    expect(spinner);
  });
});
