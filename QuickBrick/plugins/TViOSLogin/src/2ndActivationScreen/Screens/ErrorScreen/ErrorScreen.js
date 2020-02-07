import React from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import { withNavigator } from '@applicaster/zapp-react-native-ui-components/Decorators/Navigator/';
import ButtonComponent from '../../../Common/Components/Button';
import Layout from '../../../Common/Components/Layout';
import SCREENS from '../../../Common/Config/Screens';
import createStyleSheet from './ErrorStyles';
import ASSETS from './ErrorAssets';

const { width } = Dimensions.get('window');

function ErrorScreenComponent(props) {
  const {
    error = null,
    screenData = {},
    goToScreen,
    closeHook,
    navigator
  } = props;

  const customStyles = createStyleSheet(screenData);
  const {
    general: {
      activation_alert_background_color: errorBackground = '',
      retry_action_button_text: retryLabel = '',
      close_action_button_text: closeLabel = ''
    } = {}
  } = screenData;

  const onClose = () => {
    if (navigator.canGoBack()) {
      navigator.goBack();
    } else {
      closeHook({
        success: false
      });
    }
  };

  const onTryAgain = () => {
    goToScreen(SCREENS.SIGNIN);
  };

  return (
    <Layout
      backgroundColor={errorBackground}
      backgroundUri={ASSETS.screenBackground}
      closeHook={closeHook}
      logo={ASSETS.logo}
    >
      <View style={styles.container}>
        <Text style={{ ...styles.errorText, ...customStyles.errorDescriptionStyle }}>
          {error.message}
        </Text>
        <ButtonComponent
          label={retryLabel}
          onPress={onTryAgain}
          buttonStyle={styles.button}
          textStyle={customStyles.retryButtonStyle}
          backgroundButtonUri={ASSETS.retryButtonBackground}
          backgroundButtonUriActive={ASSETS.retryButtonBackgroundActive}
        />
        <ButtonComponent
          label={closeLabel}
          onPress={onClose}
          buttonStyle={styles.button}
          textStyle={customStyles.closeButtonStyle}
          backgroundButtonUri={ASSETS.closeButtonBackground}
          backgroundButtonUriActive={ASSETS.closeButtonBackgroundActive}
        />
      </View>
    </Layout>
  );
}

const styles = {
  container: {
    marginTop: '4%',
    alignItems: 'center',
    height: '100%',
    width
  },
  errorText: {
    marginBottom: '5%',
  },
  button: {
    minWidth: 600,
    minHeight: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  }
};

export const ErrorScreen = withNavigator(ErrorScreenComponent);
