import { getPluginData } from '../../../Common/Utils';

export function createStyleSheet(screenData, configuration) {
  const customStyles = getPluginData(screenData, configuration);

  const usernameInputStyle = {
    color: customStyles.username_input_fontcolor,
    fontSize: Number(customStyles.username_input_fontsize),
    // fontFamily: customStyles.username_input_font // import font families?
  };

  const passwordInputStyle = {
    color: customStyles.password_input_fontcolor,
    fontSize: Number(customStyles.password_input_fontsize),
    // fontFamily: customStyles.password_input_font // import font families?
  };

  const loginButtonStyle = {
    color: customStyles.login_action_button_fontcolor,
    fontSize: Number(customStyles.login_action_button_fontsize),
    // fontFamily: customStyles.login_action_button_font // import font families?
  };

  const fieldsEmptyErrorStyle = {
    color: customStyles.username_password_empty_fontcolor,
    fontSize: Number(customStyles.username_password_empty_fontsize),
    // fontFamily: customStyles.username_password_empty_font // import font families?
  };

  return {
    usernameInputStyle,
    passwordInputStyle,
    loginButtonStyle,
    fieldsEmptyErrorStyle
  };
}
