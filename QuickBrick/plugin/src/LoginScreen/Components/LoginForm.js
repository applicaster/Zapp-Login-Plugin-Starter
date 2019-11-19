import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import ButtonComponent from '../../Common/Components/Button';

export default function LoginForm({onLogin}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />
      {
        loading
        ? <ActivityIndicator />
        : <ButtonComponent
            label='Log In'
            callback={onLogin}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
      }

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 550,
    height: 80,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#979797',
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'normal'
  },
  button: {
    width: 550,
    height: 90,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#979797',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'normal',
    color: '#545A5C'
  }
});
