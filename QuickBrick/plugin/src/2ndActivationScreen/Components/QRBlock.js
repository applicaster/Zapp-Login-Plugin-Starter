import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import QRCode from './QRCode';

function QRBlock({ loading, QRCodehintStyle = {}, qrCodeHint = '', activationCodeUrl = '' }) {
  return (
    <View style={styles.container}>
      {
        loading
          ? <ActivityIndicator size="large" color="#D8D8D8" />
          : (
            <View style={{ alignItems: 'center' }}>
              <QRCode url={activationCodeUrl} />
              <Text
                style={{ ...QRCodehintStyle, marginTop: 22 }}
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
    marginTop: 46,
    marginRight: 40
  }
};
