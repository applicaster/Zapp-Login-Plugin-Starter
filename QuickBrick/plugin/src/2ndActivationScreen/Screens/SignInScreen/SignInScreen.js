import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import trackEvent from '../../../Analytics/index';
import AdditionalInfo from '../../Components/AdditionalInfo';
import TextBlock from '../../Components/TextBlock';
import QRBlock from '../../Components/QRBlock';
import Layout from '../../../Common/Components/Layout';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import { createActivationCodeUrl, setToLocalStorage } from '../../../Common/Utils';
import createStyleSheet from './SignInStyles';

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

  const customStyles = createStyleSheet(screenData);
  const activationCodeUrl = createActivationCodeUrl(screenData);
  const HEARBEAT_INTERVAL = 5000;
  const {
    general: {
      additional_info_text: additionalInfo,
      qr_code_hint_text: qrCodeHint,
      activation_screen_background_color: activationBackground,
      main_instructions_text: mainInstructions,
      heartbeat_activation_service: heartbeatService
    }
  } = screenData;

  useEffect(() => {
    signIn();
  }, []);

  const signIn = async () => {
    try {
      const {
        data: {
          devicePinCode = ''
        }
      } = await axios.post(activationCodeUrl,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });

      if (devicePinCode) {
        trackEvent('Activation Code Acquisition Success', { screenData, payload });
      } else {
        trackEvent('Activation Code Acquisition Success', { screenData, payload });
      }
      setPincode(devicePinCode);
      setLoading(false);
      const heartbeat = setInterval(() => getSignInStatus(), HEARBEAT_INTERVAL);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const getSignInStatus = async () => {
    try {
      const response = await axios.get(`${heartbeatService}/${pinCode}`,
        {
          headers: {
            Accept: 'application/json'
          }
        });

      if (response.data.access_token) {
        const { access_token } = response.data;

        await setToLocalStorage('token', access_token);

        trackEvent('Activation Process Success');
        closeHook({ success: true });
      }
    } catch (err) {
      trackEvent('Activation Process Failure', { screenData, payload });
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
            />
          </View>
        </View>
        {
          additionalInfo
            ? (
              <AdditionalInfo
                additionalInfo={additionalInfo}
                additionalInfoStyle={customStyles.additionalInfoStyle}
              />
            )
            : null
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
