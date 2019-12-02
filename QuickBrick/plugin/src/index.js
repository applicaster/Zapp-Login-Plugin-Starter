import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';
import { connectToStore } from '@applicaster/zapp-react-native-redux';
import SignInScreen from './2ndActivationScreen/Screens/SignInScreen/SignInScreen';
import LoginScreen from './LoginScreen/Screens/LoginScreen/LoginScreen';
import SCREENS from './Common/Config/Screens';
import { getFromLocalStorage } from './Common/Utils';

const { height } = Dimensions.get('window');
const storeConnector = connectToStore((state) => ({ screenData: state.rivers['c6f08244-b112-4da0-bb43-5764724be57c'] }));


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default storeConnector(LoginPluginComponent);
