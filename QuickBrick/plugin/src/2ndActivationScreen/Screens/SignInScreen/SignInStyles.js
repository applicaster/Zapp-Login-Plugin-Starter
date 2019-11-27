import { getPluginData } from '../../../Common/Utils';

export default function createStyleSheet(screenData, configuration) {
  const customStyles = getPluginData(screenData, configuration);

  const mainTextStyle = {
    color: customStyles.main_instructions_fontcolor,
    fontSize: Number(customStyles.main_instructions_fontsize)
  };

  const goToTextStyle = {
    color: customStyles.go_to_url_fontcolor,
    fontSize: Number(customStyles.go_to_url_fontsize)
  };

  const activationUrlStyle = {
    color: customStyles.activation_url_fontcolor,
    fontSize: Number(customStyles.activation_url_fontsize)
  };

  const codeInstructionsStyle = {
    color: customStyles.code_instructions_fontcolor,
    fontSize: Number(customStyles.code_instructions_fontsize)
  };

  const activationCodeStyle = {
    color: customStyles.activation_code_fontcolor,
    fontSize: Number(customStyles.activation_code_fontsize)
  };

  const QRCodehintStyle = {
    color: customStyles.qr_code_hint_fontcolor,
    fontSize: Number(customStyles.qr_code_hint_fontsize)
  };

  const additionalInfoStyle = {
    color: customStyles.additional_info_fontcolor,
    fontSize: Number(customStyles.additional_info_fontsize)
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
