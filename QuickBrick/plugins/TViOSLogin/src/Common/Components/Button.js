import React from 'react';
import {
  Text,
  ImageBackground
} from 'react-native';
import { Focusable } from '@applicaster/zapp-react-native-ui-components/Components/Focusable';


export default function Button(
  {
    label = '',
    onPress,
    buttonStyle = {},
    textStyle = {},
    backgroundButtonUri = '',
    backgroundButtonUriActive = ''
  }
) {
  return (
    <Focusable id={`tv-button-${label}`} onPress={onPress}>
      {
        (focused) => {
          return (
            <ImageBackground
              source={{ uri: focused ? backgroundButtonUriActive : backgroundButtonUri }}
              style={buttonStyle}
            >
              <Text
                style={focused ? { ...textStyle, color: '#5F5F5F' } : textStyle}
                adjustsFontSizeToFit
              >
                {label}
              </Text>
            </ImageBackground>
          );
        }
      }
    </Focusable>
  );
}
