import React from 'react';
import {
  ImageBackground,
  Text
} from 'react-native';

export default function ErrorComponent({ error = {}, errorBackground = '' }) {
  return (
    <ImageBackground source={{ uri: errorBackground }} style={styles.errorContainer}>
      <Text
        style={styles.errorText}
        numberOfLines={2}
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
    minWidth: 500,
    minHeight: 180,
    maxWidth: 600,
    maxHeight: 210
  },
  errorText: {
    fontSize: 41,
    fontWeight: 'normal',
    color: '#fff'
  }
};
