import { getPluginData } from '../../../Common/Utils';

export default function createStyleSheet(screenData) {
  const {
    login_title_fontcolor: loginTitleFontColor,
    login_title_fontsize: loginTitleFontSize,
    main_description_fontcolor: mainDescriptionFontColor,
    main_description_fontsize: mainDescriptionFontSize,
    optional_instructions_1_fontcolor: instructions1FontColor,
    optional_instructions_1_fontsize: instructions1FontSize,
    optional_instructions_2_fontcolor: instructions2FontColor,
    optional_instructions_2_fontsize: instructions2FontSize,
    error_notice_message_fontcolor: errorMessageFontColor,
    error_notice_message_fontsize: errorMessageFontSize
  } = getPluginData(screenData);

  const loginTitleStyle = {
    color: loginTitleFontColor,
    fontSize: Number(loginTitleFontSize)
  };

  const mainDescriptionStyle = {
    color: mainDescriptionFontColor,
    fontSize: Number(mainDescriptionFontSize)
  };

  const optionalInstructions1Style = {
    color: instructions1FontColor,
    fontSize: Number(instructions1FontSize)
  };

  const optionalInstructions2Style = {
    color: instructions2FontColor,
    fontSize: Number(instructions2FontSize)
  };

  const errorNoticeMessageStyle = {
    color: errorMessageFontColor,
    fontSize: Number(errorMessageFontSize)
  };

  return {
    loginTitleStyle,
    mainDescriptionStyle,
    optionalInstructions1Style,
    optionalInstructions2Style,
    errorNoticeMessageStyle
  };
}
