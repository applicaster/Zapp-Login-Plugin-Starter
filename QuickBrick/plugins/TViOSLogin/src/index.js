import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { connectToStore } from '@applicaster/zapp-react-native-redux';
import session from './Common/Config/Session';
import SignInScreen from './2ndActivationScreen/Screens/SignInScreen/SignInScreen';
import LoginScreen from './LoginScreen/Screens/LoginScreen/LoginScreen';
import SCREENS from './Common/Config/Screens';
import { getFromLocalStorage, isHomeScreen, isPlayerHook } from './Common/Utils';

const { height } = Dimensions.get('window');

// While screenData is not passed to the plugins,
// please use this storeConnector with id of the plugins screen
// to obtain screenData
const storeConnector = connectToStore((state) => {
  const values = Object.values(state.rivers);
  const screenData = values.find(({ type }) => type === 'quick-brick-login-starter-kit');
  const homeScreen = values.find(({ home }) => home === true);
  return { screenData, homeScreen };
});


function LoginPluginComponent(props) {
  const {
    callback,
    screenData,
    payload,
    navigator,
    homeScreen
  } = props;

  const [screen, setScreen] = useState(SCREENS.LOADING);

  session.isHomeScreen = isHomeScreen(navigator, homeScreen);

  useEffect(() => {
    start();
  }, []);

  const goToScreen = (targetScreen) => {
    setScreen(targetScreen);
  };

  const successLoginFlow = () => {
    callback({
      success: true
    });
  };

  const skipLoginflow = () => {
    callback({
      success: false
    });
  };

  const tryToSkipLoginFlow = () => {
    return session.isSkipped ? successLoginFlow() : goToScreen(SCREENS.LOGIN);
  };

  const tryToSkipPlayerHookFlow = () => {
    const forceLogin = R.pathOr(false, ['general', 'force_login'], screenData);

    const requiresAuth = R.pathOr(false, ['extensions', 'requires_authentication'], payload);
    return (!requiresAuth && !forceLogin) ? successLoginFlow() : goToScreen(SCREENS.LOGIN);
  };

  const start = async () => {
    try {
      const accessToken = await getFromLocalStorage('accessToken');
      if (accessToken) {
        successLoginFlow();
      } else {
        startLoginFlow();
      }
    } catch (err) {
      startLoginFlow();
    }
  };

  const startLoginFlow = () => {
    if (session.isHomeScreen) return tryToSkipLoginFlow();

    if (isPlayerHook(payload)) return tryToSkipPlayerHookFlow();

    goToScreen(SCREENS.LOGIN);
  };

  const remoteHandler = async (component, event) => {
    const { eventType } = event;
    if (eventType === 'menu' && navigator.canGoBack()) {
      navigator.goBack();
      return skipLoginflow();
    }
    if (eventType === 'menu' && !session.isHomeScreen) {
      skipLoginflow();
      return navigator.replace(homeScreen);
    }
  };

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
      remoteHandler={remoteHandler}
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
