import React, {useState, useEffect} from "react";
import { withNavigator } from "@applicaster/zapp-react-native-ui-components/Decorators/Navigator";
import SignInScreen from './2ndActivationScreen/Screens/SignInScreen';
import LoadingScreen from './2ndActivationScreen/Screens/LoadingScreen';
import {localStorage} from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import LoginScreen from './LoginScreen/Screens/LoginScreen';
import ErrorScreen from './2ndActivationScreen/Screens/ErrorScreen';
import getPluginData from './Common/Utils';
import SCREENS from './Common/Config/Screens';
import LocalStorageKeys from './Common/Config/LocalStorageKeys';


function LoginPluginComponent(props) {

  const {
    payload,
    callback,
    configuration,
    screenData,
    navigator
  } = props;

  const [screen, setScreen] = useState(SCREENS.LOADING);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // getPluginData(configuration, screenData);
    checkTokenStatus();
  });

  const checkTokenStatus = async () => {
    try {
      const accessToken = null;

      // const accessToken = await localStorage.getItem(LocalStorageKeys.TOKEN, LocalStorageKeys.NAMESPACE);
      // const userName = await localStorage.getItem(LocalStorageKeys.USERNAME, LocalStorageKeys.NAMESPACE);

      return accessToken ? callback({ success: true }) : goToScreen(SCREENS.LOGIN);

    } catch (err) {
      console.log(err);
      setError(err);
      goToScreen(SCREENS.ERROR);
    }
  };

  const goToScreen = (screen) => {
    setScreen(screen);
  };

  const onClose = () => {
    callback({
      success: false
    })
  };

  const onTryAgain = () => {
    goToScreen(SCREENS.SIGNIN);
  };

  const renderLoadingScreen = () => {
    return <LoadingScreen
      goToScreen={goToScreen}
    />;
  };

  const renderSignInScreen = () => {
    return <SignInScreen
      goToScreen={goToScreen}
      closeHook={callback}
    />
  };

  const renderLoginScreen = () => {
    return <LoginScreen
      goToScreen={goToScreen}
      closeHook={callback}
    />
  };

  const renderErrorScreen = () => {
    return <ErrorScreen
      goToScreen={goToScreen}
      onClose={onClose}
      onTryAgain={onTryAgain}
    />
  };

  const renderScreen = (screen) => {
    const screens = {
      [SCREENS.LOADING]: renderLoadingScreen,
      [SCREENS.SIGNIN]: renderSignInScreen,
      [SCREENS.ERROR]: renderErrorScreen,
      [SCREENS.LOGIN]: renderLoginScreen
    };

    return screens[screen]()
  };


  return (
    renderScreen(screen)
  );
}

export default LoginPluginComponent;
