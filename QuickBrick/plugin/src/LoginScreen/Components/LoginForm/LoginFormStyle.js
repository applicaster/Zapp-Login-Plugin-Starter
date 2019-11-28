import { getPluginData } from '../../../Common/Utils';

export default function createStyleSheet(screenData, configuration) {
  const customStyles = getPluginData(screenData, configuration);

  const usernameInputStyle = {
    color: customStyles.username_input_fontcolor,
    fontSize: Number(customStyles.username_input_fontsize)
  };

  const passwordInputStyle = {
    color: customStyles.password_input_fontcolor,
    fontSize: Number(customStyles.password_input_fontsize)
  };

  const loginButtonStyle = {
    color: customStyles.login_action_button_fontcolor,
    fontSize: Number(customStyles.login_action_button_fontsize)
  };

  const skipButtonStyle = {
    color: customStyles.skip_action_button_fontcolor,
    fontSize: Number(customStyles.skip_action_button_fontsize)
  };

  const fieldsEmptyErrorStyle = {
    color: customStyles.username_password_empty_fontcolor,
    fontSize: Number(customStyles.username_password_empty_fontsize)
  };

  return {
    usernameInputStyle,
    passwordInputStyle,
    loginButtonStyle,
    skipButtonStyle,
    fieldsEmptyErrorStyle
  };
}
