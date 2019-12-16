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
    marginTop: 88
  }
};

export default AdditionalInfo;
