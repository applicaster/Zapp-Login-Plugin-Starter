import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../src/LoginScreen/Components/Input';

describe('Input', () => {
  it('renders correctly', () => {
    const defaultProps = {
      loading: false,
      QRCodehintStyle: {},
      qrCodeHint: '',
      activationCodeUrl: ''
    };
    const tree = renderer
      .create(<Input props={defaultProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check loading indicator displayed', () => {
    const props = {
      loading: true
    };

    const testRenderer = renderer.create(<Input props={props} />);
    const testInstance = testRenderer.root;

    const spinner = testInstance.findAllByType('ActivityIndicator')[0];
    expect(spinner);
  });
});
