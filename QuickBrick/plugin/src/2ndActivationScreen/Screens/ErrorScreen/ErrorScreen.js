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
  const { general: pluginData } = screenData;

  const onClose = () => {
    closeHook({
      success: false
    });
  };

  const onTryAgain = () => {
    goToScreen(SCREENS.SIGNIN);
  };

  return (
    <Layout backgroundColor={pluginData.activation_alert_background_color}>
      <View style={styles.container}>
        <Text style={{ ...styles.errorText, ...customStyles.errorDescriptionStyle }}>
          {error.message}
        </Text>
        <ButtonComponent
          label={pluginData.retry_action_button_text}
          callback={onTryAgain}
          buttonStyle={styles.buttonTryAgain}
          textStyle={customStyles.retryButtonStyle}
        />
        <ButtonComponent
          label="Close"
          callback={onClose}
          buttonStyle={styles.buttonClose}
          textStyle={customStyles.closeButtonStyle}
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
