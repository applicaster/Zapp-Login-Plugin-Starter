import React from 'react';
import renderer from 'react-test-renderer';
import AdditionalInfo from '../src/2ndActivationScreen/Components/AdditionalInfo';


describe('AdditionalInfo Component', () => {
  it('Matches the snapshot', () => {
    const additionalInfo = renderer
      .create(<AdditionalInfo />)
      .toJSON();
    expect(additionalInfo).toMatchSnapshot();
  });
});
