import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import Layout from '../../../Common/Components/Layout';
import LoginForm from '../../Components/LoginForm/LoginForm';
import { getAccessToken, HEARBEAT_INTERVAL } from '../../../LoginPluginInterface';
import { setToLocalStorage } from '../../../Common/Utils';
import createStyleSheet from './LoginStyles';
import trackEvent from '../../../Analytics';
import EVENTS from '../../../Analytics/config';

const { height } = Dimensions.get('window');

function LoginScreen(props) {
  const {
    closeHook,
    screenData,
    payload
  } = props;

  const [error, setError] = useState(null);
  const customStyles = createStyleSheet(screenData);
  const {
    general: {
      login_screen_background_color: loginBackground = '',
      login_title_text: loginTitle = '',
      main_description_text: mainDescription = '',
      optional_instructions_1_text: instructions1 = '',
      optional_instructions_2_text: instructions2 = ''
    }
  } = screenData;

  const onLogin = async (username, password) => {
    try {
      trackEvent(EVENTS.clickLogin, { screenData, payload });

      const heartbeat = setInterval(() => getSignInStatus(username, password), HEARBEAT_INTERVAL);
    } catch (err) {
      trackEvent(EVENTS.loginFailure, { screenData, payload });
      console.log(err);
      setError(err);
    }
  };

  const getSignInStatus = async (username, password) => {
    try {
      const accessToken = await getAccessToken(username, password);

      if (accessToken) {
        await setToLocalStorage('token', accessToken);

        trackEvent(EVENTS.loginSuccess, { screenData, payload });
        closeHook({ success: true });
      }
    } catch (err) {
      trackEvent(EVENTS.loginFailure, { screenData, payload });
      console.log(err);
      setError(err);
    }
  };

  const handleSkip = () => {
    trackEvent(EVENTS.clickSkip, { screenData, payload });
    closeHook({ success: true });
  };

  return (
    <Layout
      backgroundColor={loginBackground}
      backgroundUri="login_screen_background_asset.png"
      error={error}
      closeHook={closeHook}
    >
      <View style={styles.loginContainer}>
        <Text
          style={{ ...styles.title, ...customStyles.loginTitleStyle }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {loginTitle}
        </Text>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text
              style={{ ...styles.mainDescription, ...customStyles.mainDescriptionStyle }}
              numberOfLines={5}
              ellipsizeMode="tail"
            >
              {mainDescription}
            </Text>
            <Text
              style={{ ...styles.optionalRequirements, ...customStyles.optionalInstructions1Style }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {instructions1}
            </Text>
            <Text
              style={{ ...styles.optionalRequirements, ...customStyles.optionalInstructions2Style }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {instructions2}
            </Text>
          </View>
          <View style={styles.formContainer}>
            <LoginForm
              onLogin={onLogin}
              screenData={screenData}
              error={error}
              handleSkip={handleSkip}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: '100%',
    height
  },
  title: {
    marginBottom: 100
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    paddingRight: 20,
    alignItems: 'flex-start'
  },
  formContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    alignItems: 'flex-end'
  },
  mainDescription: {
    marginBottom: 20
  },
  optionalRequirements: {
    marginBottom: 10
  }
});

export default LoginScreen;
