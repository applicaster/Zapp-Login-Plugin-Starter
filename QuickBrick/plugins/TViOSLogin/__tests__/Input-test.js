import React from 'react';
import renderer from 'react-test-renderer';
import { ImageBackground } from 'react-native';
import Input from '../src/LoginScreen/Components/Input';

describe('Input', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Input />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check the onFocus callback', () => {
    const inputAssetActive = 'assetActive';
    const inputAsset = 'asset';

    const testRenderer = renderer.create(
      <Input inputAssetActive={inputAssetActive} inputAsset={inputAsset} />
    );
    const testInstance = testRenderer.root;

    const input = testInstance.findAllByType('TextInput')[0];
    const background = testInstance.findAllByType(ImageBackground)[0];

    expect(background.props.source.uri).toBe(`${inputAsset}`);

    input.props.onFocus();

    expect(background.props.source.uri).toBe(`${inputAssetActive}`);
  });
});
