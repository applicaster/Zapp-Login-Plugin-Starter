import { getPluginData } from '../../../Common/Utils';

export default function createStyleSheet(screenData) {
  const {
    retry_action_button_fontcolor: retryButtonFontColor,
    retry_action_button_fontsize: retryButtonFontSize,
    close_action_button_fontcolor: closeButtonFontColor,
    close_action_button_fontsize: closeButtonFontSize,
    error_description_fontcolor: errorDescriptionFontColor,
    error_description_fontsize: errorDescriptionFontSize
  } = getPluginData(screenData);

  const retryButtonStyle = {
    color: retryButtonFontColor,
    fontSize: retryButtonFontSize
  };

  const closeButtonStyle = {
    color: closeButtonFontColor,
    fontSize: closeButtonFontSize
  };

  const errorDescriptionStyle = {
    color: errorDescriptionFontColor,
    fontSize: errorDescriptionFontSize
  };

  return {
    retryButtonStyle,
    closeButtonStyle,
    errorDescriptionStyle
  };
}
