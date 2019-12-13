import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import trackEvent from '../../../Analytics/index';
import AdditionalInfo from '../../Components/AdditionalInfo';
import TextBlock from '../../Components/TextBlock';
import QRBlock from '../../Components/QRBlock';
import Layout from '../../../Common/Components/Layout';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { getPinCode, getAccessToken } from '../../../LoginPluginInterface';
import { createActivationCodeUrl, setToLocalStorage } from '../../../Common/Utils';
import EVENTS from '../../../Analytics/config';
import createStyleSheet from './SignInStyles';
import ASSETS from './SignInAssets';

const { height } = Dimensions.get('window');

function SignInScreen(props) {
  const {
    screenData,
    payload,
    closeHook,
    goToScreen
  } = props;

  const [loading, setLoading] = useState(true);
  const [pinCode, setPincode] = useState('');
  const [error, setError] = useState(null);

  const customStyles = createStyleSheet(screenData);
  const activationCodeUrl = createActivationCodeUrl(screenData);

  const {
    general: {
      additional_info_text: additionalInfo = '',
      qr_code_hint_text: qrCodeHint = '',
      activation_screen_background_color: activationBackground = '',
      main_instructions_text: mainInstructions = '',
      heartbeat_activation_service: heartbeatService,
      go_to_url_text: goTo = '',
      activation_url_text: activationUrl = '',
      code_instructions_text: codeInstructions = '',
    } = {}
  } = screenData;

  useEffect(() => {
    signIn();
  }, []);

  const signIn = async () => {
    try {
      const devicePinCode = await getPinCode(activationCodeUrl);

      if (devicePinCode) {
        trackEvent(EVENTS.activationCodeSuccess, { screenData, payload });
        getSignInStatus();
        setPincode(devicePinCode);
        setLoading(false);
      }
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
        <View style={styles.columnsContainer}>
          <View style={styles.leftColumn}>
            <TextBlock
              mainInstructions={mainInstructions}
              goTo={goTo}
              activationUrl={activationUrl}
              codeInstructions={codeInstructions}
              loading={loading}
              pinCode={pinCode}
              customStyles={customStyles}
            />
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
          <View style={styles.rightColumn}>
            <QRBlock
              loading={loading}
              qrCodeHint={qrCodeHint}
              QRCodehintStyle={customStyles.qrCodeHintStyle}
              activationCodeUrl={`${activationCodeUrl}${pinCode}`}
            />
          </View>
        </View>
      </View>
    </Layout>
  );

  return error ? renderErrorScreen() : renderSignInScreen();
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    height
  },
  columnsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-start'
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end'
  }
};

export default SignInScreen;
