import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Layout from "../../Common/Components/Layout";
import LoginForm from '../Components/LoginForm';

function LoginScreen(props) {

  const onLogin = () => {
    // your login code here
  };

  return (
    <Layout>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>
          Login Title
        </Text>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.mainDescription}>
              Main Description
            </Text>
            <Text style={styles.optionalRequirements}>
              Optional requirements 1
            </Text>
            <Text style={styles.optionalRequirements}>
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
    width: '100%'
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
