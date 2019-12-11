import React, { useState } from 'react';
import { TextInput, ImageBackground } from 'react-native';


function Input(props) {
  const {
    inputAsset = '',
    inputAssetActive = '',
    value = '',
    onChangeText,
    placeholder = '',
    style = {}
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event) => {
    setIsFocused(true);
  };

  return (
    <ImageBackground
      source={{ uri: isFocused ? inputAssetActive : inputAsset }}
      style={{ ...style, marginBottom: 15 }}
    >
      <TextInput
        onFocus={console.log('focus')}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{ ...style, padding: 20 }}
      />
    </ImageBackground>
  );
}

export default Input;
