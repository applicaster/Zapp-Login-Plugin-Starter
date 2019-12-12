import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

function TextBlock(props) {
  const {
    goTo = '',
    mainInstructions = '',
    activationUrl = '',
    codeInstructions = '',
    loading = false,
    customStyles = {},
    pinCode = ''
  } = props;

  return (
    <>
      <Text
        style={{ ...customStyles.mainTextStyle, ...styles.title }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {mainInstructions}
      </Text>
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
        style={customStyles.codeInstructionsStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {codeInstructions}
      </Text>
      <View style={styles.activationCode}>
        {
          loading
            ? <ActivityIndicator size="small" color="#D8D8D8" />
            : (
              <Text
                style={customStyles.activationCodeStyle}
                adjustsFontSizeToFit
              >
                {pinCode}
              </Text>
            )
        }
      </View>
    </>
  );
}

export default TextBlock;

const styles = {
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 60
  },
  text: {
    marginBottom: 10
  },
  url: {
    marginBottom: 14,
    fontWeight: 'bold'
  },
  activationCode: {
    fontWeight: 'bold',
    marginTop: 38,
    width: '80%'
  }
};
