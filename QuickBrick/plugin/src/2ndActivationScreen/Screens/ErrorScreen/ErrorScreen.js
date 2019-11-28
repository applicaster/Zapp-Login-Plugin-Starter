import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import ButtonComponent from '../../../Common/Components/Button';
import Layout from '../../../Common/Components/Layout';
import SCREENS from '../../../Common/Config/Screens';
import createStyleSheet from './ErrorStyles';

const { height, width } = Dimensions.get('window');

export default function ErrorScreenComponent(props) {
  const {
    error,
    screenData,
    goToScreen,
    closeHook
  } = props;

  const customStyles = createStyleSheet(screenData);
  const {
    general: {
      activation_alert_background_color: errorBackground = '',
      retry_action_button_text: retryLabel = '',
      close_action_button_text: closeLabel = ''
    }
  } = screenData;

  const onClose = () => {
    closeHook({
      success: false
    });
  };

  const onTryAgain = () => {
    goToScreen(SCREENS.SIGNIN);
  };

  return (
    <Layout
      backgroundColor={errorBackground}
      backgroundUri="login_screen_background_asset.png"
    >
      <View style={styles.container}>
        <Text style={{ ...styles.errorText, ...customStyles.errorDescriptionStyle }}>
          {error.message}
        </Text>
        <ButtonComponent
          label={retryLabel}
          callback={onTryAgain}
          buttonStyle={styles.buttonTryAgain}
          textStyle={customStyles.retryButtonStyle}
          backgroundButtonUri="activation_alert_screen_retry_button_asset.png"
          backgroundButtonUriActive="activation_alert_screen_retry_button_asset_active.png"
        />
        <ButtonComponent
          label={closeLabel}
          callback={onClose}
          buttonStyle={styles.buttonClose}
          textStyle={customStyles.closeButtonStyle}
          backgroundButtonUri="activation_alert_screen_close_button_asset.png"
          backgroundButtonUriActive="activation_alert_screen_close_button_asset_active.png"
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -250,
    height,
    width
  },
  errorText: {
    marginBottom: 90,
  },
  buttonTryAgain: {
    backgroundColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#979797',
    width: 676,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonClose: {
    backgroundColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#979797',
    width: 450,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
