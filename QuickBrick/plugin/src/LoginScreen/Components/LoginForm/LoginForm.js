import React, { useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View
} from 'react-native';
import { Formik } from 'formik';
import validationSchema from '../../Utils/validation';
import Button from '../../../Common/Components/Button';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import createStyleSheet from './LoginFormStyle';


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
        <View style={{ alignItems: 'center' }}>
          <Input
            value={values.username}
            onChangeText={handleChange('username')}
            placeholder={usernamePlaceholder}
            style={{ ...styles.input, ...customStyles.usernameInputStyle }}
            inputAsset="login_username_input_field_asset.png"
            inputAssetActive="login_username_input_field_asset_active.png"
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
            style={{ ...styles.input, ...customStyles.passwordInputStyle }}
            inputAsset="login_password_input_field_asset.png"
            inputAssetActive="login_password_input_field_asset_active.png"
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
                  <>
                    <Button
                      label={loginLabel}
                      buttonStyle={styles.button}
                      callback={handleSubmit}
                      textStyle={customStyles.loginButtonStyle}
                      backgroundButtonUri="login_action_button_asset.png"
                      backgroundButtonUriActive="login_action_button_asset_active.png"
                    />
                    {
                      skip
                        ? (
                          <Button
                            label={skipLabel}
                            callback={handleSkip}
                            buttonStyle={styles.button}
                            textStyle={customStyles.loginButtonStyle}
                            backgroundButtonUri="skip_action_button_asset.png"
                            backgroundButtonUriActive="skip_action_button_asset_active.png"
                          />
                        )
                        : null
                    }
                  </>
                )
            }
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 550,
    height: 80,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#979797',
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
    minWidth: 550,
    minHeight: 90,
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
    alignItems: 'center',
    marginTop: 10
  }
});
