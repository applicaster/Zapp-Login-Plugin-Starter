import React, { useState, useEffect } from 'react';
import { connectToStore } from '@applicaster/zapp-react-native-redux';
import SignInScreen from './2ndActivationScreen/Screens/SignInScreen/SignInScreen';
import LoginScreen from './LoginScreen/Screens/LoginScreen/LoginScreen';
import SCREENS from './Common/Config/Screens';
import { getFromLocalStorage } from './Common/Utils';

const storeConnector = connectToStore((state) => ({ screenData: state.rivers['c6f08244-b112-4da0-bb43-5764724be57c'] }));


function LoginPluginComponent(props) {
  const {
    callback,
    screenData,
    payload
  } = props;

  const [screen, setScreen] = useState(SCREENS.SIGNIN);

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    silentLogin();
  }, []);

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
      [SCREENS.LOGIN]: renderLoginScreen
    };

    return screens[targetScreen]();
  };

  return (
    renderScreen(screen)
  );
}

export default storeConnector(LoginPluginComponent);
