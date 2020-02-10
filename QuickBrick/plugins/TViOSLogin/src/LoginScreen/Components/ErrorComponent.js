import React from 'react';
import {
  ImageBackground,
  Text
} from 'react-native';

export default function ErrorComponent({ error = {}, errorBackground = '', errorStyle }) {
  return (
    <ImageBackground source={{ uri: errorBackground }} style={styles.errorContainer}>
      <Text
        style={errorStyle}
        adjustsFontSizeToFit
        numberOfLines={4}
        ellipsizeMode="tail"
      >
        {error && error.message}
      </Text>
    </ImageBackground>
  );
}

const styles = {
  errorContainer: {
    position: 'absolute',
    top: 24,
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    height: 200,
    padding: 20
  }
};
