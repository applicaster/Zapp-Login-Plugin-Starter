import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Layout from "../Components/Layout";
import LoginForm from '../Components/LoginForm';

function LoginScreen() {

  const onLogin = () => {
    // your login code here
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>
          Login Title
        </Text>
        <View>
          <Text style={styles.title}>
           Main Description
          </Text>
          <Text>
            Optional requirements 1
          </Text>
          <Text>
            Optional requirements 1
          </Text>
        </View>
        <LoginForm onLogin={onLogin}/>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: "#525A5C",
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 110
  }
});

LoginScreen.displayName = 'LoginScreen';
export default LoginScreen;
