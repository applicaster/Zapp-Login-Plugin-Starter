import { getPluginData } from '../../../Common/Utils';

export function createStyleSheet(screenData, configuration) {
  const customStyles = getPluginData(screenData, configuration);

  const mainTextStyle = {
    color: customStyles.main_instructions_fontcolor,
    fontSize: Number(customStyles.main_instructions_fontsize),
    // fontFamily: customStyles.main_instructions_font // import font families?
  };

  const goToTextStyle = {
    color: customStyles.go_to_url_fontcolor,
    fontSize: Number(customStyles.go_to_url_fontsize),
    // fontFamily: customStyles.go_to_url_font // import font families?
  };

  const activationUrlStyle = {
    color: customStyles.activation_url_fontcolor,
    fontSize: Number(customStyles.activation_url_fontsize),
    // fontFamily: customStyles.activation_url_font // import font families?
  };

  const codeInstructionsStyle = {
    color: customStyles.code_instructions_fontcolor,
    fontSize: Number(customStyles.code_instructions_fontsize),
    // fontFamily: customStyles.code_instructions_font // import font families?
  };

  const activationCodeStyle = {
    color: customStyles.activation_code_fontcolor,
    fontSize: Number(customStyles.activation_code_fontsize),
    // fontFamily: customStyles.activation_code_font // import font families?
  };

  const QRCodehintStyle = {
    color: customStyles.qr_code_hint_fontcolor,
    fontSize: Number(customStyles.qr_code_hint_fontsize),
    // fontFamily: customStyles.qr_code_hint_font // import font families?
  };

  const additionalInfoStyle = {
    color: customStyles.additional_info_fontcolor,
    fontSize: Number(customStyles.additional_info_fontsize),
    // fontFamily: customStyles.additional_info_font // import font families?
  };

  return {
    mainTextStyle,
    goToTextStyle,
    activationUrlStyle,
    codeInstructionsStyle,
    activationCodeStyle,
    QRCodehintStyle,
    additionalInfoStyle
  };
}
