import { getPluginData } from '../../../Common/Utils';

export function createStyleSheet(screenData, configuration) {
  const customStyles = getPluginData(screenData, configuration);

  const loginTitleStyle = {
    color: customStyles.login_title_fontcolor,
    fontSize: Number(customStyles.login_title_fontsize),
    // fontFamily: customStyles.login_title_font // import font families?
  };

  const mainDescriptionStyle = {
    color: customStyles.main_description_fontcolor,
    fontSize: Number(customStyles.main_description_fontsize),
    // fontFamily: customStyles.main_description_font // import font families?
  };

  const optionalInstructions1Style = {
    color: customStyles.optional_instructions_1_fontcolor,
    fontSize: Number(customStyles.optional_instructions_1_fontsize),
    // fontFamily: customStyles.optional_instructions_1_font // import font families?
  };

  const optionalInstructions2Style = {
    color: customStyles.optional_instructions_2_fontcolor,
    fontSize: Number(customStyles.optional_instructions_2_fontsize),
    // fontFamily: customStyles.optional_instructions_2_font // import font families?
  };

  const errorNoticeMessageStyle = {
    color: customStyles.error_notice_message_fontcolor,
    fontSize: Number(customStyles.error_notice_message_fontsize),
    // fontFamily: customStyles.error_notice_message_font // import font families?
  };

  return {
    loginTitleStyle,
    mainDescriptionStyle,
    optionalInstructions1Style,
    optionalInstructions2Style,
    errorNoticeMessageStyle
  };
}
