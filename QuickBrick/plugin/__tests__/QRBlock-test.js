import React from 'react';
import renderer from 'react-test-renderer';
import QRBlock from '../src/2ndActivationScreen/Components/QRBlock';

describe('QRBlock', () => {
  it('renders correctly', () => {
    const defaultProps = {
      loading: false,
      qrCodeHintStyle: {},
      qrCodeHint: '',
      activationCodeUrl: ''
    };
    const tree = renderer
      .create(<QRBlock props={defaultProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check loading indicator displayed', () => {
    const props = {
      loading: true
    };

    const testRenderer = renderer.create(<QRBlock props={props} />);
    const testInstance = testRenderer.root;

    const spinner = testInstance.findAllByType('ActivityIndicator')[0];
    expect(spinner);
  });
});
