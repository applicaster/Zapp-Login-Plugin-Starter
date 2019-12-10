import React from 'react';
import { View, Text } from 'react-native';

const ErrorMessage = ({ errorValue = '', customStyles = {} }) => (
  <View style={styles.container}>
    <Text style={{ ...customStyles.fieldsEmptyErrorStyle, fontWeight: 'bold' }}>
      {errorValue}
    </Text>
  </View>
);

const styles = {
  container: {
    marginLeft: 25
  }
};

export default ErrorMessage;
