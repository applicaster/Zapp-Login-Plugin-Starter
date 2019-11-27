import { getPluginData } from '../../../Common/Utils';

export default function createStyleSheet(screenData, configuration) {
  const customStyles = getPluginData(screenData, configuration);

  const loginTitleStyle = {
    color: customStyles.login_title_fontcolor,
    fontSize: Number(customStyles.login_title_fontsize)
  };

  const mainDescriptionStyle = {
    color: customStyles.main_description_fontcolor,
    fontSize: Number(customStyles.main_description_fontsize)
  };

  const optionalInstructions1Style = {
    color: customStyles.optional_instructions_1_fontcolor,
    fontSize: Number(customStyles.optional_instructions_1_fontsize)
  };

  const optionalInstructions2Style = {
    color: customStyles.optional_instructions_2_fontcolor,
    fontSize: Number(customStyles.optional_instructions_2_fontsize)
  };

  const errorNoticeMessageStyle = {
    color: customStyles.error_notice_message_fontcolor,
    fontSize: Number(customStyles.error_notice_message_fontsize)
  };

  return {
    loginTitleStyle,
    mainDescriptionStyle,
    optionalInstructions1Style,
    optionalInstructions2Style,
    errorNoticeMessageStyle
  };
}
