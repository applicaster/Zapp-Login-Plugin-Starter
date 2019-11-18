import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from 'react-native'

export default function LoginForm({onLogin}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder={''}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={''}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button
        title={'Login'}
        style={styles.input}
        onPress={() => onLogin()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 550,
    height: 80,
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  }
});
