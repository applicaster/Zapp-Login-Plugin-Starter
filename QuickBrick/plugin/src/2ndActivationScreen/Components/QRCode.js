import * as React from 'react';
import { Image } from 'react-native';

export default function QRButton({ url = '' }) {
  return (
    <Image
      style={{ width: 330, height: 330 }}
      resizeMode="contain"
      source={{ uri: url }}
    />
  );
}
