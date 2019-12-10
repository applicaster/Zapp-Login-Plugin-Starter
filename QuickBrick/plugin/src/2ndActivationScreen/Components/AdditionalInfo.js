import React from 'react';
import { View, Text } from 'react-native';

function AdditionalInfo(props) {
  const {
    additionalInfo,
    additionalInfoStyle
  } = props;

  return (
    <View style={styles.bottomText}>
      <Text
        style={additionalInfoStyle}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {additionalInfo}
      </Text>
    </View>
  );
}

const styles = {
  bottomText: {
    maxWidth: 1110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
    marginBottom: 100
  }
};

export default AdditionalInfo;
