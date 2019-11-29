import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import QRCode from './QRCode';

function QRBlock({ loading, QRCodehintStyle, qrCodeHint, activationCodeUrl }) {
  return (
    loading
      ? (
        <View style={styles.loadContainer}>
          <ActivityIndicator size="large" color="#525A5C" />
        </View>
      )
      : (
        <View style={{ alignItems: 'center' }}>
          <QRCode url={activationCodeUrl} />
          <Text
            style={{ ...QRCodehintStyle, marginTop: 20 }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {qrCodeHint}
          </Text>
        </View>
      )
  );
}

export default QRBlock;

const styles = StyleSheet.create({
  loadContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
