import { getPluginData } from '../../../Common/Utils';

export function createStyleSheet(screenData, configuration) {
  const customStyles = getPluginData(screenData, configuration);

  const retryButtonStyle = {
    color: customStyles.retry_action_button_fontcolor,
    fontSize: Number(customStyles.retry_action_button_fontsize),
    // fontFamily: customStyles.retry_action_button_font // import font families?
  };

  const closeButtonStyle = {
    color: customStyles.close_action_button_fontcolor,
    fontSize: Number(customStyles.close_action_button_fontsize),
    // fontFamily: customStyles.close_action_button_font // import font families?
  };

  const errorDescriptionStyle = {
    color: customStyles.error_description_fontcolor,
    fontSize: Number(customStyles.error_description_fontsize),
    // fontFamily: customStyles.error_description_font // import font families?
  };

  return {
    retryButtonStyle,
    closeButtonStyle,
    errorDescriptionStyle
  };
}
