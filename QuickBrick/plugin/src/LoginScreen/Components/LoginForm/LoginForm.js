import React, { useState } from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import { Formik } from 'formik';
import validationSchema from '../../Utils/validation';
import Button from '../../../Common/Components/Button';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import createStyleSheet from './LoginFormStyle';
import ASSETS from './LoginFormAssets';


export default function LoginForm(props) {
  const {
    onLogin,
    screenData,
    error,
    handleSkip
  } = props;

  const [loading, setLoading] = useState(false);

  const customStyles = createStyleSheet(screenData);
  const {
    general: {
      username_input_placeholder: usernamePlaceholder = '',
      password_input_placeholder: passwordPlaceholder = '',
      login_action_button_text: loginLabel = '',
      skip_action_button_text: skipLabel = '',
      enable_skip_functionality: skip = true
    }
  } = screenData;

  const handleOnLogin = async (values, actions) => {
    const { username, password } = values;
    try {
      setLoading(true);
      onLogin(username, password);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
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
          touched
        }
      ) => (
        <>
          <View style={styles.container}>
            <Input
              value={values.username}
              onChangeText={handleChange('username')}
              placeholder={usernamePlaceholder}
              style={{ ...styles.input, ...customStyles.usernameInputStyle }}
              inputAsset={ASSETS.usernameInputBackground}
              inputAssetActive={ASSETS.usernameInputBackgroundActive}
            />
            <ErrorMessage
              errorValue={touched.username && errors.username}
              customStyles={customStyles}
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder={passwordPlaceholder}
              secureTextEntry
              style={{ ...styles.input, ...customStyles.passwordInputStyle, marginBottom: 0 }}
              inputAsset={ASSETS.usernameInputBackground}
              inputAssetActive={ASSETS.usernameInputBackgroundActive}
            />
            <ErrorMessage
              errorValue={touched.password && errors.password}
              customStyles={customStyles}
            />
          </View>
          <View style={styles.container}>
            {
              (loading && !error)
                ? <ActivityIndicator />
                : (
                  <>
                    <Button
                      label={loginLabel}
                      buttonStyle={styles.input}
                      callback={handleSubmit}
                      textStyle={customStyles.loginButtonStyle}
                      backgroundButtonUri={ASSETS.loginButtonBackground}
                      backgroundButtonUriActive={ASSETS.loginButtonBackgroundActive}
                    />
                    {
                      skip
                      && (
                        <Button
                          label={skipLabel}
                          callback={handleSkip}
                          buttonStyle={styles.input}
                          textStyle={customStyles.loginButtonStyle}
                          backgroundButtonUri={ASSETS.skipButtonBackground}
                          backgroundButtonUriActive={ASSETS.skipButtonBackgroundActive}
                        />
                      )
                    }
                  </>
                )
            }
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = {
  error: {
    position: 'absolute',
    bottom: 0,
    color: 'red',
    fontSize: 12
  },
  container: {
    minWidth: 610,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45
  },
  input: {
    minWidth: 610,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  }
};
