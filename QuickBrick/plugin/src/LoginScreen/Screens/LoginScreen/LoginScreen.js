import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import Layout from '../../../Common/Components/Layout';
import LoginForm from '../../Components/LoginForm/LoginForm';
import createStyleSheet from './LoginStyles';
import trackEvent from '../../../Analytics';

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
      login_screen_background_color: loginBackground,
      login_title_text: loginTitle,
      main_description_text: mainDescription,
      optional_instructions_1_text: instructions1,
      optional_instructions_2_text: instructions2
    }
  } = screenData;

  const onLogin = async () => {
    try {
      trackEvent('Click Login Button', { screenData, payload });
      // const response = await axios.get(`${loginUrl}`,
      //   {
      //     headers: {
      //       Accept: 'application/json'
      //     }
      //   });
      //
      // if (response.data.access_token) {
      //   const { access_token } = response.data;
      //
      //   await setToLocalStorage('token', access_token);
      //
      //   trackEvent('Login Success', { screenData, payload });
      //   closeHook({ success: true });
      // } else {
      //    trackEvent('Login Failure', { screenData, payload });
      //  }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <Layout
      backgroundColor={loginBackground}
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
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {mainDescription}
            </Text>
            <Text
              style={{ ...styles.optionalRequirements, ...customStyles.optionalInstructions1Style }}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {instructions1}
            </Text>
            <Text
              style={{ ...styles.optionalRequirements, ...customStyles.optionalInstructions2Style }}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {instructions2}
            </Text>
          </View>
          <View style={styles.formContainer}>
            <LoginForm onLogin={onLogin} screenData={screenData} error={error} />
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
