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
    skip_action_button_fontsize: skipButtonFontSize,
    username_password_empty_fontcolor: fieldsEmptyErrorFontColor,
    username_password_empty_fontsize: fieldsEmptyErrorFontSize
  } = getPluginData(screenData);

  const usernameInputStyle = {
    color: usernameFontColor,
    fontSize: Number(usernameFontSize)
  };

  const passwordInputStyle = {
    color: passwordFontColor,
    fontSize: Number(passwordFontSize)
  };

  const loginButtonStyle = {
    color: loginButtonFontColor,
    fontSize: Number(loginButtonFontSize)
  };

  const skipButtonStyle = {
    color: skipButtonFontColor,
    fontSize: Number(skipButtonFontSize)
  };

  const fieldsEmptyErrorStyle = {
    color: fieldsEmptyErrorFontColor,
    fontSize: Number(fieldsEmptyErrorFontSize)
  };

  return {
    usernameInputStyle,
    passwordInputStyle,
    loginButtonStyle,
    skipButtonStyle,
    fieldsEmptyErrorStyle
  };
}
