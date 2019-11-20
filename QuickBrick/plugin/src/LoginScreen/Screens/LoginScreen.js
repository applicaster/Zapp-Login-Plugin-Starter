import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import Layout from "../../Common/Components/Layout";
import LoginForm from '../Components/LoginForm';

const { height } = Dimensions.get('window');

function LoginScreen(props) {

  const { onLogin } = props;
  const [error, setError] = useState(null);

  return (
    <Layout backgroundColor={'#D5D5D5'} error={error}>
      <View style={styles.loginContainer}>
        <Text
          style={styles.title}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          Login Title
        </Text>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text
              style={styles.mainDescription}
              numberOfLines={4}
              ellipsizeMode={'tail'}
            >
              Main Description
            </Text>
            <Text
              style={styles.optionalRequirements}
              numberOfLines={4}
              ellipsizeMode={'tail'}
            >
              Optional requirements 1
            </Text>
            <Text
              style={styles.optionalRequirements}
              numberOfLines={4}
              ellipsizeMode={'tail'}
            >
              Optional requirements 2
            </Text>
          </View>
          <View style={styles.formContainer}>
            <LoginForm onLogin={onLogin}/>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: '100%',
    height
  },
  title: {
    color: "#525A5C",
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 100
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    paddingRight: 20,
    alignItems: 'flex-start'
  },
  formContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    alignItems: 'flex-end'
  },
  mainDescription: {
    color: "#525A5C",
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20
  },
  optionalRequirements: {
    color: "#525A5C",
    fontSize: 30,
    fontWeight: 'normal',
    marginBottom: 10
  }
});

LoginScreen.displayName = 'LoginScreen';
export default LoginScreen;
