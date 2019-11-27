import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Focusable } from '@applicaster/zapp-react-native-ui-components/Components/Focusable';


export default function Button(
  {
    label,
    callback,
    buttonStyle,
    textStyle,
    ...rest
  }
) {
  return (
    <Focusable id={`tv-button-${label}`} onPress={callback}>
      {
        (focused) => {
          return (
            <View
              style={focused ? { ...buttonStyle, backgroundColor: 'rgba(255, 255, 255, 0.8)' } : buttonStyle}
            >
              <Text
                style={focused ? { ...textStyle, color: '#5F5F5F' } : textStyle}
                adjustsFontSizeToFit
              >
                {label}
              </Text>
            </View>
          );
        }
      }
    </Focusable>
  );
}
