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
    top: 50,
    right: 50,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 497,
    minHeight: 172,
    maxWidth: 600,
    maxHeight: 210,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 10,
    backgroundColor: '#979797'
  },
  errorText: {
    fontSize: 41,
    fontWeight: 'normal',
    color: '#fff'
  }
};
