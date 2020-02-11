import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import session from '../../../Common/Config/Session';
import Layout from '../../../Common/Components/Layout';
import LoginForm from '../../Components/LoginForm/LoginForm';
import { getAccessToken } from '../../../LoginPluginInterface';
import { setToLocalStorage } from '../../../Common/Utils';
import createStyleSheet from './LoginStyles';
import trackEvent from '../../../Analytics';
import EVENTS from '../../../Analytics/config';
import ASSETS from './LoginScreenAssets';

const { height } = Dimensions.get('window');

function LoginScreen(props) {
  const {
    closeHook,
    screenData,
    payload,
    remoteHandler
  } = props;

  useEffect(() => () => {
    session.appLaunch = false;
  }, [session.isSkipped]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    trackEvent(EVENTS.clickLogin, { screenData, payload });
    setLoading(true);
    setError(null);

    return getSignInStatus(username, password);
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
      setLoading(false);
      setError(err);
    }
  };

  const handleError = (message) => {
    setError({ message });
  };

  const handleSkip = async () => {
    session.isSkipped = true;
    trackEvent(EVENTS.clickSkip, { screenData, payload });
    closeHook({ success: true });
  };

  return (
    <Layout
      backgroundColor={loginBackground}
      backgroundUri={ASSETS.loginScreenBackground}
      error={error}
      errorStyle={customStyles.errorNoticeMessageStyle}
      errorBackground={ASSETS.errorBackground}
      logo={ASSETS.logo}
      remoteHandler={remoteHandler}
    >
      <View style={styles.loginContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text
              style={{ ...styles.title, ...customStyles.loginTitleStyle }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {loginTitle}
            </Text>
            <Text
              style={{ ...styles.mainDescription, ...customStyles.mainDescriptionStyle }}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {mainDescription}
            </Text>
            <Text
              style={{ ...styles.instructions, ...customStyles.optionalInstructions1Style }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {instructions1}
            </Text>
            <Text
              style={{ ...styles.instructions, ...customStyles.optionalInstructions2Style }}
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
              isLoading={loading}
              handleSkip={handleSkip}
              handleError={handleError}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = {
  loginContainer: {
    flex: 1,
    width: '100%',
    height
  },
  title: {
    fontWeight: 'bold',
    paddingTop: 10
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    paddingRight: '2%',
    alignItems: 'flex-start'
  },
  formContainer: {
    flex: 1,
    paddingLeft: '2%',
    alignItems: 'flex-end'
  },
  mainDescription: {
    marginTop: '7%',
    marginBottom: '7%'
  },
  instructions: {
    marginBottom: '3.3%'
  }
};

export default LoginScreen;
