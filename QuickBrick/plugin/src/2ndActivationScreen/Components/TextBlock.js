import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

function TextBlock({ screenData, loading, customStyles, pinCode }) {
  const {
    general: {
      go_to_url_text: goTo,
      activation_url_text: activationUrl,
      code_instructions_text: codeInstructions,
    }
  } = screenData;

  return (
    <>
      <Text
        style={{ ...customStyles.goToTextStyle, ...styles.text }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {goTo}
      </Text>
      <Text
        style={{ ...customStyles.activationUrlStyle, ...styles.url }}
        adjustsFontSizeToFit
      >
        {activationUrl}
      </Text>
      <Text
        style={{ ...customStyles.codeInstructionsStyle, ...styles.url }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {codeInstructions}
      </Text>
      {
        loading
          ? (
            <View style={styles.pinCodeSpinner}>
              <ActivityIndicator size="small" color="#525A5C" />
            </View>
          )
          : (
            <Text
              style={customStyles.activationCodeStyle}
              adjustsFontSizeToFit
            >
              {pinCode}
            </Text>
          )
      }
    </>
  );
}

export default TextBlock;

const styles = StyleSheet.create({
  text: {
    marginBottom: 20
  },
  url: {
    marginBottom: 60
  },
  pinCodeSpinner: {
    width: 500,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
