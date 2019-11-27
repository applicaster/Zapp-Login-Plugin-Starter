import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  ActivityIndicator,
  View
} from 'react-native';
import { Formik } from 'formik';
import validationSchema from '../../Utils/validation';
import Button from '../../../Common/Components/Button';
import ErrorMessage from '../ErrorMessage';
import createStyleSheet from './LoginFormStyle';


export default function LoginForm({ onLogin, screenData, error }) {
  const [loading, setLoading] = useState(false);

  const customStyles = createStyleSheet(screenData);
  const { general: pluginData } = screenData;

  const handleOnLogin = async (values, actions) => {
    const { email, password } = values;
    try {
      setLoading(true);
      onLogin(email, password);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, actions) => {
        handleOnLogin(values, actions);
      }}
      validationSchema={validationSchema}
    >
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
            placeholder={pluginData.username_input_placeholder}
            style={{ ...styles.input, ...customStyles.usernameInputStyle }}
          />
          <ErrorMessage
            errorValue={touched.email && errors.email}
            customStyles={customStyles}
          />
          <TextInput
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder={pluginData.password_input_placeholder}
            secureTextEntry
            style={{ ...styles.input, ...customStyles.passwordInputStyle }}
          />
          <ErrorMessage
            errorValue={touched.password && errors.password}
            customStyles={customStyles}
          />
          <View style={styles.buttonContainer}>
            {
              (loading && !error)
                ? <ActivityIndicator />
                : (
                  <Button
                    label={pluginData.login_action_button_text}
                    callback={handleSubmit}
                    disabled={!isValid}
                    buttonStyle={styles.button}
                    textStyle={customStyles.loginButtonStyle}
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
  }
});
