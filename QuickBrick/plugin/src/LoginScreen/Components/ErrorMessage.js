import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ errorValue, customStyles }) => (
  <View style={styles.container}>
    <Text style={customStyles.fieldsEmptyErrorStyle}>{errorValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 25
  }
});

export default ErrorMessage;
