import React from 'react';
import {
  ActivityIndicator,
  View,
  SafeAreaView
} from 'react-native';
import { Formik } from 'formik';
import validationSchema from '../../Utils/validation';
import Button from '../../../Common/Components/Button';
import Input from '../Input';
import createStyleSheet from './LoginFormStyle';
import ASSETS from './LoginFormAssets';


export default function LoginForm(props) {
  const {
    onLogin,
    screenData,
    isLoading,
    handleSkip
  } = props;

  const customStyles = createStyleSheet(screenData);
  const {
    general: {
      username_input_placeholder: usernamePlaceholder = '',
      password_input_placeholder: passwordPlaceholder = '',
      login_action_button_text: loginLabel = '',
      skip_action_button_text: skipLabel = '',
      enable_skip_functionality: skip = false
    }
  } = screenData;

  const handleOnLogin = async (values, actions) => {
    const { username, password } = values;
    onLogin(username, password);
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
        <SafeAreaView>
          <View style={styles.container}>
            <Input
              value={values.username}
              onChangeText={handleChange('username')}
              secureTextEntry={false}
              placeholder={usernamePlaceholder}
              style={{ ...styles.input, ...customStyles.usernameInputStyle }}
              inputAsset={ASSETS.usernameInputBackground}
              inputAssetActive={ASSETS.usernameInputBackgroundActive}
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              placeholder={passwordPlaceholder}
              style={{ ...styles.input, ...customStyles.passwordInputStyle, marginBottom: 0 }}
              inputAsset={ASSETS.usernameInputBackground}
              inputAssetActive={ASSETS.usernameInputBackgroundActive}
            />
          </View>
          <View style={styles.container}>
            {
              isLoading
                ? <ActivityIndicator size="large" />
                : (
                  <>
                    <Button
                      label={loginLabel}
                      buttonStyle={styles.input}
                      onPress={handleSubmit}
                      textStyle={customStyles.loginButtonStyle}
                      backgroundButtonUri={ASSETS.loginButtonBackground}
                      backgroundButtonUriActive={ASSETS.loginButtonBackgroundActive}
                    />
                    {
                      skip
                      && (
                        <Button
                          label={skipLabel}
                          onPress={handleSkip}
                          buttonStyle={styles.input}
                          textStyle={customStyles.skipButtonStyle}
                          backgroundButtonUri={ASSETS.skipButtonBackground}
                          backgroundButtonUriActive={ASSETS.skipButtonBackgroundActive}
                        />
                      )
                    }
                  </>
                )
            }
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}

const styles = {
  container: {
    minWidth: '31.8%',
    minHeight: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%'
  },
  input: {
    minWidth: 610,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.5%'
  }
};
