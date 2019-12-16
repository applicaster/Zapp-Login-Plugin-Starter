import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { connectToStore } from '@applicaster/zapp-react-native-redux';
import SignInScreen from './2ndActivationScreen/Screens/SignInScreen/SignInScreen';
import LoginScreen from './LoginScreen/Screens/LoginScreen/LoginScreen';
import SCREENS from './Common/Config/Screens';
import { getFromLocalStorage } from './Common/Utils';

const { height } = Dimensions.get('window');

// While screenData is not passed to the plugin,
// please use this storeConnector with id of the plugin screen
// to obtain screenData
const storeConnector = connectToStore((state) => ({ screenData: state.rivers['a6b19cba-4180-472a-9545-3fce6e45d223'] }));


function LoginPluginComponent(props) {
  const {
    callback,
    screenData,
    payload
  } = props;

  const [screen, setScreen] = useState(SCREENS.LOADING);

  const goToScreen = (targetScreen) => {
    setScreen(targetScreen);
  };

  const silentLogin = async () => {
    try {
      const value = await getFromLocalStorage('token');
      if (value !== null && value !== undefined) {
        callback({
          success: true
        });
      } else {
        goToScreen(SCREENS.SIGNIN);
      }
    } catch (error) {
      console.log(error);
      goToScreen(SCREENS.SIGNIN);
    }
  };

  useEffect(() => {
    silentLogin();
  }, []);

  const renderLoadingScreen = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#525A5C" />
    </View>
  );

  const renderSignInScreen = () => (
    <SignInScreen
      closeHook={callback}
      screenData={screenData}
      payload={payload}
      goToScreen={goToScreen}
    />
  );

  const renderLoginScreen = () => (
    <LoginScreen
      closeHook={callback}
      screenData={screenData}
      payload={payload}
      goToScreen={goToScreen}
    />
  );

  const renderScreen = (targetScreen) => {
    const screens = {
      [SCREENS.SIGNIN]: renderSignInScreen,
      [SCREENS.LOGIN]: renderLoginScreen,
      [SCREENS.LOADING]: renderLoadingScreen
    };

    return screens[targetScreen]();
  };

  return (
    renderScreen(screen)
  );
}

const styles = {
  container: {
    flex: 1,
    height,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
};

// export default LoginPluginComponent;
export default storeConnector(LoginPluginComponent);
