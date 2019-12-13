import { getPluginData } from '../../../Common/Utils';

export default function createStyleSheet(screenData) {
  const {
    main_instructions_fontcolor: mainFontColor,
    main_instructions_fontsize: mainFontSize,
    go_to_url_fontcolor: goToFontColor,
    go_to_url_fontsize: goToFontSize,
    activation_url_fontcolor: activationUrlFontColor,
    activation_url_fontsize: activationUrlFontSize,
    code_instructions_fontcolor: codeInstructionsFontColor,
    code_instructions_fontsize: codeInstructionsFontSize,
    activation_code_fontcolor: activationCodeFontColor,
    activation_code_fontsize: activationCodeFontSize,
    qr_code_hint_fontcolor: qrCodeHintFontColor,
    qr_code_hint_fontsize: qrCodeHintFontSize,
    additional_info_fontcolor: additionalInfoFontColor,
    additional_info_fontsize: additionalInfoFontSize
  } = getPluginData(screenData);

  const mainTextStyle = {
    color: mainFontColor,
    fontSize: Number(mainFontSize)
  };

  const goToTextStyle = {
    color: goToFontColor,
    fontSize: Number(goToFontSize)
  };

  const activationUrlStyle = {
    color: activationUrlFontColor,
    fontSize: Number(activationUrlFontSize)
  };

  const codeInstructionsStyle = {
    color: codeInstructionsFontColor,
    fontSize: Number(codeInstructionsFontSize)
  };

  const activationCodeStyle = {
    color: activationCodeFontColor,
    fontSize: Number(activationCodeFontSize)
  };

  const qrCodeHintStyle = {
    color: qrCodeHintFontColor,
    fontSize: Number(qrCodeHintFontSize)
  };

  const additionalInfoStyle = {
    color: additionalInfoFontColor,
    fontSize: Number(additionalInfoFontSize)
  };

  return {
    mainTextStyle,
    goToTextStyle,
    activationUrlStyle,
    codeInstructionsStyle,
    activationCodeStyle,
    qrCodeHintStyle,
    additionalInfoStyle
  };
}
