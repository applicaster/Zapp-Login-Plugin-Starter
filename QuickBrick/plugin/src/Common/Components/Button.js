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
          // const buttonStyles = styles[focused ? 'focused' : 'default'];
          return (
            <View style={buttonStyle}>
              <Text
                style={textStyle}
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
