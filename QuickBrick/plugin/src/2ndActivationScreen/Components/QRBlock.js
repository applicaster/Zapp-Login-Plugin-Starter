import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import QRCode from './QRCode';

function QRBlock({ loading, qrCodeHintStyle = {}, qrCodeHint = '', activationCodeUrl = '' }) {
  return (
    <View style={styles.container}>
      {
        loading
          ? <ActivityIndicator size="large" color="#D8D8D8" />
          : (
            <View style={{ alignItems: 'center' }}>
              <QRCode url={activationCodeUrl} />
              <Text
                style={{ ...qrCodeHintStyle, marginTop: '3.5%' }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {qrCodeHint}
              </Text>
            </View>
          )
      }
    </View>
  );
}

export default QRBlock;

const styles = {
  container: {
    minWidth: 340,
    minHeight: 340,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6.3%',
    marginRight: '5.5%'
  }
};
