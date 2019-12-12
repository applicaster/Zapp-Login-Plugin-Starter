import React, { useState } from 'react';
import { TextInput, ImageBackground } from 'react-native';


function Input(props) {
  const {
    inputAsset = '',
    inputAssetActive = '',
    value = '',
    onChangeText,
    secureTextEntry = false,
    placeholder = '',
    style = {}
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <ImageBackground
      source={{ uri: isFocused ? inputAssetActive : inputAsset }}
      style={{ ...style, marginBottom: 15 }}
    >
      <TextInput
        onFocus={() => setIsFocused(true)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={{ ...style, padding: 20 }}
      />
    </ImageBackground>
  );
}

export default Input;
