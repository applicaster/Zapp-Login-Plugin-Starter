import React from 'react';
import { View, Text } from 'react-native';

const ErrorMessage = ({ errorValue = '', customStyles = {} }) => (
  <View style={styles.container}>
    <Text style={customStyles.fieldsEmptyErrorStyle}>
      {errorValue}
    </Text>
  </View>
);

const styles = {
  container: {
    marginTop: 52
  }
};

export default ErrorMessage;
