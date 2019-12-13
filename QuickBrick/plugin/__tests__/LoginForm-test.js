import React from 'react';
import { create, act } from 'react-test-renderer';
import LoginForm from '../src/LoginScreen/Components/LoginForm/LoginForm';
import Button from '../src/Common/Components/Button';
import ErrorMessage from '../src/LoginScreen/Components/ErrorMessage';


describe('LoginForm', () => {
  const screenData = {
    general: {
      enable_skip_functionality: false
    }
  };

  it('renders correctly', () => {
    const error = null;

    const tree = create(<LoginForm screenData={screenData} error={error} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check skip button displayed', () => {
    screenData.general.enable_skip_functionality = true;
    screenData.general.skip_action_button_text = 'Skip';

    const testRenderer = create(
      <LoginForm screenData={screenData} />
    );
    const testInstance = testRenderer.root;
    const buttons = testInstance.findAllByType(Button);

    expect(buttons).toHaveLength(2);
    expect(buttons[1].props.label).toBe(`${screenData.general.skip_action_button_text}`);
  });

  it('check error displayed on Login button click', async () => {
    const testRenderer = create(
      <LoginForm screenData={screenData} />
    );
    const testInstance = testRenderer.root;
    const loginButton = testInstance.findAllByType(Button)[0];
    loginButton.props.onPress();

    const error = testInstance.findAllByType(ErrorMessage);

    expect(error).toHaveLength(1);
  });

  it('check spinner displayed on submitting form', async () => {
    const rendered = create(
      <LoginForm screenData={screenData} />
    );

    const [usernameInput, passwordInput] = rendered.root.findAllByType('TextInput');
    const [loginButton] = rendered.root.findAllByType(Button);

    usernameInput.value = 'username';
    passwordInput.value = 'password';
    loginButton.props.onPress();
    rendered.update(<LoginForm screenData={screenData} />);

    const spinner = rendered.root.findAllByType('ActivityIndicator');
    expect(spinner).toHaveLength(0);
  });
});
