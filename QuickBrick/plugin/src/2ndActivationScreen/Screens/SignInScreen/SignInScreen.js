import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import trackEvent from '../../../Analytics/index';
import AdditionalInfo from '../../Components/AdditionalInfo';
import TextBlock from '../../Components/TextBlock';
import QRBlock from '../../Components/QRBlock';
import Layout from '../../../Common/Components/Layout';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import { getPinCode, HEARBEAT_INTERVAL, getAccessToken } from '../../../LoginPluginInterface';
import { createActivationCodeUrl, setToLocalStorage } from '../../../Common/Utils';
import EVENTS from '../../../Analytics/config';
import createStyleSheet from './SignInStyles';
import ASSETS from './SignInAssets';

function SignInScreen(props) {
  const {
    screenData,
    payload,
    closeHook,
    goToScreen
  } = props;

  const [loading, setLoading] = useState(false);
  const [pinCode, setPincode] = useState('');
  const [error, setError] = useState(null);
  const [heartBeat, setHeartBeat] = useState(null);

  const customStyles = createStyleSheet(screenData);
  const activationCodeUrl = createActivationCodeUrl(screenData);

  const {
    general: {
      additional_info_text: additionalInfo,
      qr_code_hint_text: qrCodeHint,
      activation_screen_background_color: activationBackground,
      main_instructions_text: mainInstructions,
      heartbeat_activation_service: heartbeatService
    } = {}
  } = screenData;

  useEffect(() => {
    signIn();

    return () => {
      clearInterval(heartBeat);
    };
  }, []);

  const signIn = async () => {
    try {
      const devicePinCode = await getPinCode();

      if (devicePinCode) {
        trackEvent(EVENTS.activationCodeSuccess, { screenData, payload });
      }
      const heartbeat = setInterval(() => getSignInStatus(), HEARBEAT_INTERVAL);
      setPincode(devicePinCode);
      setHeartBeat(heartbeat);
      setLoading(false);
    } catch (err) {
      trackEvent(EVENTS.activationCodeFailure, { screenData, payload });
      console.log(err);
      setError(err);
    }
  };

  const getSignInStatus = async () => {
    try {
      const accessToken = await getAccessToken(heartbeatService, pinCode);
      if (accessToken) {
        await setToLocalStorage('token', accessToken);

        trackEvent(EVENTS.activationSuccess, { screenData, payload });
        closeHook({ success: true });
      }
    } catch (err) {
      trackEvent(EVENTS.activationFailure, { screenData, payload });
      console.log(err);
      setError(err);
    }
  };

  const renderErrorScreen = () => (
    <ErrorScreen
      error={error}
      screenData={screenData}
      goToScreen={goToScreen}
      closeHook={closeHook}
    />
  );

  const renderSignInScreen = () => (
    <Layout
      backgroundColor={activationBackground}
      backgroundUri={ASSETS.screenBackground}
      logo={ASSETS.logo}
      closeHook={closeHook}
    >
      <View style={styles.container}>
        <Text
          style={{ ...customStyles.mainTextStyle, ...styles.title }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {mainInstructions}
        </Text>
        <View style={styles.columnsContainer}>
          <View style={styles.leftColumn}>
            <TextBlock
              screenData={screenData}
              loading={loading}
              pinCode={pinCode}
              customStyles={customStyles}
            />
          </View>
          <View style={styles.rightColumn}>
            <QRBlock
              loading={loading}
              qrCodeHint={qrCodeHint}
              QRCodehintStyle={customStyles.QRCodehintStyle}
              activationCodeUrl={`${activationCodeUrl}${pinCode}`}
            />
          </View>
        </View>
        {
          additionalInfo
          && (
            <AdditionalInfo
              additionalInfo={additionalInfo}
              additionalInfoStyle={customStyles.additionalInfoStyle}
            />
          )
        }
      </View>
    </Layout>
  );

  return error ? renderErrorScreen() : renderSignInScreen();
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    marginBottom: 110
  },
  columnsContainer: {
    maxWidth: 1110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRightColor: '#979797',
    borderRightWidth: 4,
    minHeight: 330
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    minHeight: 330
  }
};

export default SignInScreen;
