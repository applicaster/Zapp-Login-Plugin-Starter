import * as React from 'react';
import { Image } from 'react-native';

export default function QRButton({ url = '' }) {
  return (
    <Image
      style={{ width: 340, height: 340 }}
      resizeMode="contain"
      source={{ uri: url }}
    />
  );
}
