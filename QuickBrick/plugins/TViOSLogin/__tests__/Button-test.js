import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../src/Common/Components/Button';

describe('Button', () => {
  const backgroundButtonUri = 'background';
  const backgroundButtonUriActive = 'activeBackground';

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Button
          backgroundButtonUri={backgroundButtonUri}
          backgroundButtonUriActive={backgroundButtonUriActive}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
