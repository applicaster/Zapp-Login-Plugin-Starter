import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  ActivityIndicator,
  View
} from 'react-native';
import { Formik } from 'formik';
import validationSchema from '../Utils/validation';
import Button from '../../Common/Components/Button';
import ErrorMessage from './ErrorMessage';


export default function LoginForm({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleOnLogin = async (values, actions) => {
    const { email, password } = values;
    try {
      setLoading(true);
      onLogin();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, actions) => {
        handleOnLogin(values, actions);
      }}
      validationSchema={validationSchema}>
      {(
        {
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur
        }
      ) => (
        <>
          <TextInput
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder={'email'}
            style={styles.input}
          />
          <ErrorMessage errorValue={touched.email && errors.email} />
          <TextInput
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder={'password'}
            secureTextEntry
            style={styles.input}
          />
          <ErrorMessage errorValue={touched.password && errors.password} />
          <View style={styles.buttonContainer}>
            {
              loading
                ? <ActivityIndicator />
                : (
                  <Button
                    label="Log In"
                    callback={handleSubmit}
                    disabled={!isValid}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                  />
                )
            }
          </View>
        </>
      )}
    </Formik>
  );
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
  error: {
    position: 'absolute',
    bottom: 0,
    color: 'red',
    fontSize: 12
  },
  buttonContainer: {
    width: 550,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
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
