import { getPluginData } from '../../../Common/Utils';

export default function createStyleSheet(screenData) {
  const {
    username_input_fontcolor: usernameFontColor,
    username_input_fontsize: usernameFontSize,
    password_input_fontcolor: passwordFontColor,
    password_input_fontsize: passwordFontSize,
    login_action_button_fontcolor: loginButtonFontColor,
    login_action_button_fontsize: loginButtonFontSize,
    skip_action_button_fontcolor: skipButtonFontColor,
    skip_action_button_fontsize: skipButtonFontSize
  } = getPluginData(screenData);

  const usernameInputStyle = {
    color: usernameFontColor,
    fontSize: usernameFontSize
  };

  const passwordInputStyle = {
    color: passwordFontColor,
    fontSize: passwordFontSize
  };

  const loginButtonStyle = {
    color: loginButtonFontColor,
    fontSize: loginButtonFontSize
  };

  const skipButtonStyle = {
    color: skipButtonFontColor,
    fontSize: skipButtonFontSize
  };

  return {
    usernameInputStyle,
    passwordInputStyle,
    loginButtonStyle,
    skipButtonStyle
  };
}
